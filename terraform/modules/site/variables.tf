variable "project_name" {
  description = "Project name used in resource naming."
  type        = string
}

variable "bucket_name" {
  description = "Globally unique S3 bucket name for the static site origin."
  type        = string
}

variable "domain_name" {
  description = "Root domain name for the site."
  type        = string
}

variable "tags" {
  description = "Tags applied to all site resources."
  type        = map(string)
  default     = {}
}
