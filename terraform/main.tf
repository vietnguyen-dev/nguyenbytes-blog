locals {
  common_tags = merge(
    {
      Project   = var.project_name
      ManagedBy = "Terraform"
    },
    var.tags
  )

  portfolio_source_dir = abspath("${path.module}/${var.portfolio_source_dir}")
  lambda_source_dir    = abspath("${path.module}/${var.lambda_source_dir}")
}

module "site" {
  source = "./modules/site"

  providers = {
    aws     = aws
    aws.acm = aws.us_east_1
  }

  project_name = var.project_name
  bucket_name  = "nguyenbytes-prod-bucket"
  domain_name  = var.domain_name
  tags         = local.common_tags
}

module "email" {
  source = "./modules/email"

  project_name         = var.project_name
  lambda_source_dir    = local.lambda_source_dir
  lambda_function_name = var.lambda_function_name
  lambda_timeout       = var.lambda_timeout
  lambda_memory_size   = var.lambda_memory_size
  ses_from_email       = var.ses_from_email
  notification_email   = var.notification_email
  ses_identity_arn     = var.ses_identity_arn
  api_stage_name       = var.api_stage_name
  allowed_origins      = var.allowed_origins
  tags                 = local.common_tags
}

resource "aws_ssm_parameter" "deploy_site_bucket_name" {
  name  = "${var.ssm_parameter_prefix}/deploy/site_bucket_name"
  type  = "String"
  value = module.site.bucket_name

  tags = local.common_tags
}

resource "aws_ssm_parameter" "deploy_distribution_id" {
  name  = "${var.ssm_parameter_prefix}/deploy/cloudfront_distribution_id"
  type  = "String"
  value = module.site.distribution_id

  tags = local.common_tags
}

resource "aws_ssm_parameter" "deploy_contact_api_url" {
  name  = "${var.ssm_parameter_prefix}/deploy/contact_api_url"
  type  = "String"
  value = module.email.api_url

  tags = local.common_tags
}

resource "aws_ssm_parameter" "deploy_lambda_function_name" {
  name  = "${var.ssm_parameter_prefix}/deploy/lambda_function_name"
  type  = "String"
  value = module.email.lambda_name

  tags = local.common_tags
}

resource "aws_ssm_parameter" "deploy_lambda_role_arn" {
  name  = "${var.ssm_parameter_prefix}/deploy/lambda_role_arn"
  type  = "SecureString"
  value = module.email.lambda_role_arn

  tags = local.common_tags
}
