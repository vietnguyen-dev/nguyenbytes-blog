locals {
  common_tags = merge(
    {
      Project   = var.project_name
      ManagedBy = "Terraform"
    },
    var.tags
  )

  portfolio_dir = abspath("${path.module}/${var.portfolio_source_dir}")
  lambda_dir    = abspath("${path.module}/${var.lambda_source_dir}")

  portfolio_files = fileset(local.portfolio_dir, "**")

  mime_types = {
    css   = "text/css"
    gif   = "image/gif"
    html  = "text/html"
    ico   = "image/x-icon"
    jpeg  = "image/jpeg"
    jpg   = "image/jpeg"
    js    = "application/javascript"
    json  = "application/json"
    map   = "application/json"
    pdf   = "application/pdf"
    png   = "image/png"
    svg   = "image/svg+xml"
    txt   = "text/plain"
    webp  = "image/webp"
    woff  = "font/woff"
    woff2 = "font/woff2"
    xml   = "application/xml"
  }
}

data "archive_file" "email_lambda" {
  type        = "zip"
  source_dir  = local.lambda_dir
  output_path = "${path.module}/email-lambda.zip"
}

resource "aws_s3_bucket" "portfolio" {
  bucket = var.portfolio_bucket_name

  tags = local.common_tags
}

resource "aws_s3_bucket_ownership_controls" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "portfolio" {
  depends_on = [
    aws_s3_bucket_ownership_controls.portfolio,
    aws_s3_bucket_public_access_block.portfolio,
  ]

  bucket = aws_s3_bucket.portfolio.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "portfolio" {
  bucket = aws_s3_bucket.portfolio.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

data "aws_iam_policy_document" "portfolio_public_read" {
  statement {
    sid    = "PublicReadGetObject"
    effect = "Allow"

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = ["s3:GetObject"]

    resources = [
      "${aws_s3_bucket.portfolio.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "portfolio_public_read" {
  bucket = aws_s3_bucket.portfolio.id
  policy = data.aws_iam_policy_document.portfolio_public_read.json
}

resource "aws_s3_object" "portfolio_assets" {
  for_each = { for file_name in local.portfolio_files : file_name => file_name }

  bucket = aws_s3_bucket.portfolio.id
  key    = each.value
  source = "${local.portfolio_dir}/${each.value}"
  etag   = filemd5("${local.portfolio_dir}/${each.value}")

  content_type = lookup(
    local.mime_types,
    lower(element(reverse(split(".", each.value)), 0)),
    "application/octet-stream"
  )

  tags = local.common_tags
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "email_lambda" {
  name               = "${var.project_name}-email-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.email_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "lambda_ses" {
  statement {
    effect = "Allow"

    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
    ]

    resources = var.ses_identity_arn == null ? ["*"] : [var.ses_identity_arn]
  }
}

resource "aws_iam_role_policy" "lambda_ses" {
  name   = "${var.project_name}-ses-send"
  role   = aws_iam_role.email_lambda.id
  policy = data.aws_iam_policy_document.lambda_ses.json
}

resource "aws_lambda_function" "email" {
  function_name    = var.lambda_function_name
  description      = "Handles portfolio contact form submissions and sends email with SES."
  role             = aws_iam_role.email_lambda.arn
  handler          = "index.handler"
  runtime          = "nodejs20.x"
  filename         = data.archive_file.email_lambda.output_path
  source_code_hash = data.archive_file.email_lambda.output_base64sha256
  timeout          = var.lambda_timeout
  memory_size      = var.lambda_memory_size

  environment {
    variables = {
      SES_FROM_EMAIL     = var.ses_from_email
      NOTIFICATION_EMAIL = var.notification_email
    }
  }

  tags = local.common_tags
}

resource "aws_apigatewayv2_api" "email" {
  name          = "${var.project_name}-email-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers = ["content-type"]
    allow_methods = ["OPTIONS", "POST"]
    allow_origins = var.allowed_origins
    max_age       = 300
  }

  tags = local.common_tags
}

resource "aws_apigatewayv2_integration" "email_lambda" {
  api_id                 = aws_apigatewayv2_api.email.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.email.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "email_post" {
  api_id    = aws_apigatewayv2_api.email.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.email_lambda.id}"
}

resource "aws_apigatewayv2_route" "email_options" {
  api_id    = aws_apigatewayv2_api.email.id
  route_key = "OPTIONS /contact"
  target    = "integrations/${aws_apigatewayv2_integration.email_lambda.id}"
}

resource "aws_apigatewayv2_stage" "email" {
  api_id      = aws_apigatewayv2_api.email.id
  name        = var.api_stage_name
  auto_deploy = true

  tags = local.common_tags
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowExecutionFromHttpApi"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.email.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.email.execution_arn}/*/*"
}
