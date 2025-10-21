# ==== customize these ====
PROJECT_ID="algolia-sitesearch"
BUCKET="algolia-sitesearch-cdn"         # must be globally unique
DOMAIN="cdn.yourdomain.com"             # your future custom domain

# ==== usually fine as-is ====
REGION="US"                             # or "europe-west1"
BACKEND_BUCKET="cdn-backend-bucket"
URL_MAP="cdn-url-map"
TARGET_PROXY="cdn-https-proxy"
FORWARDING_RULE="cdn-https-fr"
IP_NAME="cdn-global-ip"
CERT_NAME="cdn-managed-cert"


gcloud config set project "$PROJECT_ID"

# Create bucket (multi-region EU). Change $REGION if desired.
gsutil mb -p "$PROJECT_ID" -l "$REGION" "gs://$BUCKET/"

# Uniform ACL & public read for objects
gsutil uniformbucketlevelaccess set on "gs://$BUCKET"
gsutil iam ch allUsers:objectViewer "gs://$BUCKET"

# (Optional) create versioned path and add a test file
echo 'console.log("hello from v1");' | gsutil cp - "gs://$BUCKET/v1/main.js"

# Strong caching for versioned files (immutable for a year)
gsutil -m setmeta -h "Cache-Control:public,max-age=31536000,immutable" "gs://$BUCKET/v1/**"


# Backend bucket with CDN enabled
gcloud compute backend-buckets create "$BACKEND_BUCKET" \
  --gcs-bucket-name="$BUCKET" \
  --enable-cdn

# URL map that routes all paths to the backend bucket
gcloud compute url-maps create "$URL_MAP" \
  --default-backend-bucket="$BACKEND_BUCKET"


# Reserve a global IPv4 address for the HTTPS LB
gcloud compute addresses create "$IP_NAME" --global

# Managed SSL for your domain (will become ACTIVE after you point DNS)
gcloud compute ssl-certificates create "$CERT_NAME" \
  --domains="$DOMAIN" \
  --global


# HTTPS proxy using the URL map + managed cert
gcloud compute target-https-proxies create "$TARGET_PROXY" \
  --url-map="$URL_MAP" \
  --ssl-certificates="$CERT_NAME"

# Global forwarding rule on 443
gcloud compute forwarding-rules create "$FORWARDING_RULE" \
  --address="$IP_NAME" \
  --global \
  --target-https-proxy="$TARGET_PROXY" \
  --ports=443


# Get the LB IP
#################

gcloud config set project "$PROJECT_ID"

# 1) Backend bucket with CDN enabled (origin = your GCS bucket)
gcloud compute backend-buckets create "$BACKEND_BUCKET" \
  --gcs-bucket-name="$BUCKET" \
  --enable-cdn

# 2) URL map (send all paths to the backend bucket)
gcloud compute url-maps create "$URL_MAP" \
  --default-backend-bucket="$BACKEND_BUCKET"

# 3) HTTP proxy (no cert needed)
gcloud compute target-http-proxies create "$TARGET_HTTP_PROXY" \
  --url-map="$URL_MAP"

# 4) Global forwarding rule on port 80 (this gives you a public ANYCAST IP)
gcloud compute forwarding-rules create "$FORWARDING_RULE_HTTP" \
  --global \
  --target-http-proxy="$TARGET_HTTP_PROXY" \
  --ports=80

# 5) Get the LB IP
LB_IP="$(gcloud compute forwarding-rules describe "$FORWARDING_RULE_HTTP" --global --format='value(IPAddress)')"
echo "LB_IP: $LB_IP"

# 6) Test (HTTP) — this IS served by Cloud CDN (edge cache), but over HTTP:
curl -I "http://$LB_IP/v1/main.js"