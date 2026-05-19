output "portfolio_bucket_name" {
  description = "S3 bucket name for the portfolio site."
  value       = module.site.bucket_name
}

output "portfolio_domain_name" {
  description = "Primary custom domain for the portfolio site."
  value       = var.domain_name
}

output "portfolio_distribution_id" {
  description = "CloudFront distribution ID for the portfolio site."
  value       = module.site.distribution_id
}

output "portfolio_distribution_domain_name" {
  description = "CloudFront distribution domain name for the portfolio site."
  value       = module.site.distribution_domain_name
}

output "portfolio_certificate_arn" {
  description = "ACM certificate ARN covering the root and www domains."
  value       = module.site.certificate_arn
}

output "portfolio_api_url" {
  description = "Invoke URL for the email contact endpoint."
  value       = module.email.api_url
}

output "email_lambda_name" {
  description = "Deployed email lambda function name."
  value       = module.email.lambda_name
}

output "email_lambda_role_arn" {
  description = "IAM role ARN used by the email Lambda."
  value       = module.email.lambda_role_arn
  sensitive   = true
}
