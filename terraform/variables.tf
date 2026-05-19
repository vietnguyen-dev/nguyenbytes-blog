variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
}

variable "project_name" {
  description = "Project name used as the base for resource naming and tags."
  type        = string
  default     = "nguyenbytes-portfolio"
}

variable "domain_name" {
  description = "Root domain name for the CloudFront distribution and Route 53 records."
  type        = string
  default     = "nguyenbytes.com"
}

variable "portfolio_source_dir" {
  description = "Path to the static portfolio directory."
  type        = string
  default     = "../threejs-porfolio"
}

variable "ssm_parameter_prefix" {
  description = "SSM parameter path prefix used to publish deployment metadata."
  type        = string
  default     = "/nguyenbytes-blog"
}

variable "lambda_source_dir" {
  description = "Path to the email lambda directory."
  type        = string
  default     = "../email-lambda"
}

variable "lambda_function_name" {
  description = "Lambda function name for the email handler."
  type        = string
  default     = "portfolio-email"
}

variable "lambda_timeout" {
  description = "Lambda timeout in seconds."
  type        = number
  default     = 15
}

variable "lambda_memory_size" {
  description = "Lambda memory size in MB."
  type        = number
  default     = 256
}

variable "ses_from_email" {
  description = "Verified SES sender email address exposed to the lambda as SES_FROM_EMAIL."
  type        = string
}

variable "notification_email" {
  description = "Email address that should receive portfolio contact notifications."
  type        = string
}

variable "ses_identity_arn" {
  description = "Optional SES identity ARN to scope send permissions. Leave null to allow SES send actions on any verified identity in the account."
  type        = string
  default     = null
}

variable "api_stage_name" {
  description = "HTTP API stage name."
  type        = string
  default     = "prod"
}

variable "allowed_origins" {
  description = "Allowed origins for API Gateway CORS."
  type        = list(string)
  default = [
    "https://nguyenbytes.com",
    "https://www.nguyenbytes.com",
  ]
}

variable "tags" {
  description = "Common tags applied to all resources."
  type        = map(string)
  default     = {}
}
