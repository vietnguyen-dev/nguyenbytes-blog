# Nguyenbytes Portfolio

This repository contains a personal portfolio site, an AWS Lambda email handler for the contact form, and Terraform infrastructure to deploy both pieces. It is a small project focused on combining application code with cloud infrastructure provisioning on AWS using Terraform, with room for CI/CD automation through GitHub Actions.

## What This Project Is

The portfolio is a static frontend built with plain HTML, CSS, and JavaScript. It uses `three.js` to render the animated 3D laptop scene and keeps the rest of the experience lightweight with no frontend build step.

The contact form posts JSON to an AWS HTTP API. That API invokes a Node.js Lambda, which validates the request and sends an email through Amazon SES.

Terraform manages the AWS resources for:

- an S3 bucket configured for static website hosting
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
├── terraform/          # AWS infrastructure for S3, Lambda, IAM, and API Gateway
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

- provisions a public S3 website bucket
- uploads the files from `threejs-porfolio/`
- zips `email-lambda/` and deploys it as a `nodejs20.x` Lambda
- creates the IAM role and policies needed by the Lambda
- creates an HTTP API with a `/contact` route
- outputs the static site URL and API URL

### CI/CD

This project is structured to work well with GitHub Actions for CI/CD automation. A typical workflow would:

- install Terraform and initialize the `terraform/` directory
- run formatting and validation checks
- package and deploy infrastructure changes with `terraform plan` and `terraform apply`
- automate deployments for the static site and Lambda as changes are pushed

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

## Deploying With Terraform

1. Create a Terraform variables file from the example:

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

2. Fill in:

- `aws_region`
- `portfolio_bucket_name`
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

- the S3 website URL
- the API URL for the contact endpoint

Use the API output as the contact form endpoint in the portfolio.

## Notes

- The S3 bucket name must be globally unique.
- The SES sender must be verified in the AWS account and region you use.
- If your AWS account is still in the SES sandbox, email delivery restrictions will apply.
- The directory is currently named `threejs-porfolio/`. If you rename it later to `threejs-portfolio/`, update the Terraform variable defaults or tfvars accordingly.
