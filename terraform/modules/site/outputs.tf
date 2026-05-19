output "bucket_name" {
  description = "S3 origin bucket name."
  value       = aws_s3_bucket.site.bucket
}

output "distribution_id" {
  description = "CloudFront distribution ID."
  value       = aws_cloudfront_distribution.site.id
}

output "distribution_domain_name" {
  description = "CloudFront distribution domain name."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "certificate_arn" {
  description = "ACM certificate ARN for the site domain."
  value       = aws_acm_certificate_validation.site.certificate_arn
}

output "web_acl_arn" {
  description = "WAF web ACL ARN attached to the CloudFront distribution."
  value       = aws_wafv2_web_acl.site.arn
}
