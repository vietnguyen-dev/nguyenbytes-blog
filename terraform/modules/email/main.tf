data "archive_file" "email_lambda" {
  type        = "zip"
  source_dir  = var.lambda_source_dir
  output_path = "${path.module}/email-lambda.zip"
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

  tags = var.tags
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

  tags = var.tags
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

  tags = var.tags
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

  tags = var.tags
}

resource "aws_lambda_permission" "allow_api_gateway" {
  statement_id  = "AllowExecutionFromHttpApi"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.email.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.email.execution_arn}/*/*"
}
