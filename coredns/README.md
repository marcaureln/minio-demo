# CoreDNS

The `Corefile` is configured to forward DNS queries for both `minio.local` and any subdomains of `minio.local` to the Docker's internal DNS server.

**Notes:** `minio.local` subdomains might be bucket names, so we need to forward them to the MinIO service.
