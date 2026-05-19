variable "aws_region" {
  description = "AWS region for the Terraform state bucket."
  type        = string
  default     = "us-west-2"
}

variable "terraform_state_bucket_name" {
  description = "Globally unique S3 bucket name for Terraform state."
  type        = string
}

variable "tags" {
  description = "Tags applied to the Terraform state bucket."
  type        = map(string)
  default = {
    ManagedBy = "Terraform"
    Purpose   = "terraform-state"
  }
}
