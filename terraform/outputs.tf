output "portfolio_bucket_name" {
  description = "S3 bucket name for the portfolio site."
  value       = aws_s3_bucket.portfolio.bucket
}

output "portfolio_website_url" {
  description = "S3 static website endpoint for the portfolio site."
  value       = "http://${aws_s3_bucket_website_configuration.portfolio.website_endpoint}"
}

output "portfolio_api_url" {
  description = "Invoke URL for the email contact endpoint."
  value       = "${aws_apigatewayv2_stage.email.invoke_url}/contact"
}

output "email_lambda_name" {
  description = "Deployed email lambda function name."
  value       = aws_lambda_function.email.function_name
}
