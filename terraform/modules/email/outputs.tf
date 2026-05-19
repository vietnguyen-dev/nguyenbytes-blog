output "api_url" {
  description = "Invoke URL for the email contact endpoint."
  value       = "${aws_apigatewayv2_stage.email.invoke_url}/contact"
}

output "lambda_name" {
  description = "Deployed email Lambda function name."
  value       = aws_lambda_function.email.function_name
}

output "lambda_role_arn" {
  description = "IAM role ARN used by the email Lambda."
  value       = aws_iam_role.email_lambda.arn
}
