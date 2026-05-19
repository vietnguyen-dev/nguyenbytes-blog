variable "project_name" {
  description = "Project name used in resource naming."
  type        = string
}

variable "lambda_source_dir" {
  description = "Absolute path to the Lambda source directory."
  type        = string
}

variable "lambda_function_name" {
  description = "Lambda function name for the email handler."
  type        = string
}

variable "lambda_timeout" {
  description = "Lambda timeout in seconds."
  type        = number
}

variable "lambda_memory_size" {
  description = "Lambda memory size in MB."
  type        = number
}

variable "ses_from_email" {
  description = "Verified SES sender email address exposed to the Lambda."
  type        = string
}

variable "notification_email" {
  description = "Email address that should receive contact notifications."
  type        = string
}

variable "ses_identity_arn" {
  description = "Optional SES identity ARN to scope send permissions."
  type        = string
  default     = null
}

variable "api_stage_name" {
  description = "HTTP API stage name."
  type        = string
}

variable "allowed_origins" {
  description = "Allowed origins for API Gateway CORS."
  type        = list(string)
}

variable "tags" {
  description = "Tags applied to all email resources."
  type        = map(string)
  default     = {}
}
