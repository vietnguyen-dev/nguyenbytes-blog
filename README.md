# Nguyenbytes Portfolio

This repository contains a personal portfolio site, an AWS Lambda email handler for the contact form, and Terraform infrastructure to deploy both pieces. It is a small project focused on combining application code with cloud infrastructure provisioning on AWS using Terraform, with room for CI/CD automation through GitHub Actions.

## What This Project Is

The portfolio is a static frontend built with plain HTML, CSS, and JavaScript. It uses `three.js` to render the animated 3D laptop scene and keeps the rest of the experience lightweight with no frontend build step.

The contact form posts JSON to an AWS HTTP API. That API invokes a Node.js Lambda, which validates the request and sends an email through Amazon SES.

Terraform manages the AWS resources for:

- a private S3 bucket that serves as the CloudFront origin
- a CloudFront distribution with ACM and a minimal WAF web ACL
- Route 53 validation and alias records for `nguyenbytes.com` and `www.nguyenbytes.com`
- the uploaded portfolio assets from `threejs-porfolio/`
- the Lambda function from `email-lambda/`
- IAM permissions for Lambda execution and SES sending
- an API Gateway HTTP API endpoint at `POST /contact`

At a high level, the project combines:

- a static frontend
- a serverless backend for contact submissions
- AWS infrastructure provisioning with Terraform
- CI/CD-oriented deployment automation patterns that fit GitHub Actions

## Repository Layout

```text
.
├── email-lambda/       # Node.js Lambda that sends email with SES
├── terraform/          # AWS infrastructure, modules, and backend bootstrap config
└── threejs-porfolio/   # Static portfolio site
```

## How It Is Made

### Frontend

- `threejs-porfolio/index.html` is the homepage
- `threejs-porfolio/contact.html` contains the contact form
- `threejs-porfolio/styles.css` handles layout, color, and responsive styling
- `threejs-porfolio/index.js` drives the UI behavior, theme toggle, animations, and `three.js` scene

The frontend is intentionally simple:

- no React, Next.js, or bundler
- Google Fonts loaded directly in the HTML
- `three.js` loaded through an import map from a CDN
- static assets served directly from the bucket

### Contact Email Backend

The Lambda in `email-lambda/index.js`:

- accepts form submissions from API Gateway
- validates `name`, `email`, `company`, and `note`
- handles CORS for `OPTIONS` and `POST`
- sends both text and HTML email bodies with Amazon SES

It expects these environment variables:

- `SES_FROM_EMAIL`
- `NOTIFICATION_EMAIL`

### Infrastructure

Terraform in `terraform/` does the following:

- provisions a private S3 origin bucket
- provisions a CloudFront distribution for `nguyenbytes.com` and `www.nguyenbytes.com`
- requests and validates an ACM certificate in `us-east-1` for the root and `www` names
- attaches a minimal AWS managed WAF rule group to CloudFront
- uploads the files from `threejs-porfolio/`
- zips `email-lambda/` and deploys it as a `nodejs20.x` Lambda
- creates the IAM role and policies needed by the Lambda
- creates an HTTP API with a `/contact` route
- outputs the CloudFront and API details

### CI/CD

This project is structured to work well with GitHub Actions for CI/CD automation. A typical workflow would:

- install Terraform and initialize the `terraform/` directory against an S3 backend
- run formatting and validation checks
- provision infrastructure with Terraform in one job
- deploy the static site and Lambda code in a second job
- publish deploy metadata to SSM Parameter Store for the deploy job

## Local Development

The portfolio is static, so you can open the HTML files directly or serve them with a simple static file server.

Examples:

```bash
cd threejs-porfolio
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

For the Lambda:

```bash
cd email-lambda
npm install
```

## Terraform State Backend

Use a separate S3 bucket for Terraform state. Do not reuse the website bucket.

Bootstrap it once:

```bash
cd terraform/bootstrap
terraform init
terraform apply -var='terraform_state_bucket_name=github-actions-nguyenbytes-blog'
```

Then create a backend config for the main stack from `terraform/backend.hcl.example`, or let GitHub Actions pass the backend settings during `terraform init`.

The GitHub workflow expects this repository variable:

- `TF_STATE_BUCKET_NAME` set to `github-actions-nguyenbytes-blog`

The main Terraform stack also writes deploy metadata into SSM Parameter Store under `/nguyenbytes-blog/deploy/...`.

## Deploying With Terraform

1. Create a Terraform variables file from the example:

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

2. Fill in:

- `aws_region`
- `domain_name`
- `ses_from_email`
- `notification_email`
- optionally `ses_identity_arn`
- optionally `allowed_origins`

3. Deploy:

```bash
terraform init
terraform plan
terraform apply
```

4. After apply, Terraform outputs:

- the CloudFront distribution domain
- the ACM certificate ARN
- the API URL for the contact endpoint

## Deploy Script

`deploy.sh` reads deployment metadata from SSM Parameter Store and then:

- updates the contact form API URL in `threejs-porfolio/contact.html`
- uploads the static site to the private S3 origin bucket
- updates the Lambda function code
- invalidates the CloudFront cache

Use the API output as the contact form endpoint in the portfolio.

## Notes

- The Terraform state bucket name must be globally unique.
- The site bucket name is fixed to `nguyenbytes-prod-bucket`.
- CloudFront certificates must be created in `us-east-1`, even when the rest of the stack runs in `us-west-2`.
- The SES sender must be verified in the AWS account and region you use.
- If your AWS account is still in the SES sandbox, email delivery restrictions will apply.
- The directory is currently named `threejs-porfolio/`. If you rename it later to `threejs-portfolio/`, update the Terraform variable defaults or tfvars accordingly.
