# MinIO demo

- [MinIO Docker Deployment Docs](https://min.io/docs/minio/container/index.html)
- [MinIO on Docker Hub](https://hub.docker.com/r/minio/minio)

## Getting Started

To run MinIO on your local machine, you will use Docker and the following services:

- **MinIO**: The object storage server.
- **Caddy**: A reverse proxy that will handle the HTTPS termination.
- **CoreDNS**: A DNS server that will resolve the MinIO hostname to the local machine.

### Prerequisites

Ensure you have the following installed on your machine:

- Docker
- Docker Compose
- OpenSSL

### Configure local DNS (CoreDNS)

To access MinIO from an application that isn't running inside Docker, you need to ensure proper DNS resolution for the domain (i.e., `minio.local`) pointing to the MinIO service inside Docker.

Add the following line to the `/etc/hosts` file on your local machine (might require admin privileges):

```txt
127.0.0.1 minio.local test-bucket.minio.local
```

In the previous line, `minio.local` is the hostname of the MinIO API and `test-bucket.minio.local` is the hostname of the bucket that we will create later. 

**⚠️ Warning:** We didn't set up any redirections from HTTP to HTTPS, so you might get a warning from your browser. You can ignore it for now and make sure to access the API using the full [https://minio.local].

### Configure reverse proxy (Caddy)

Generate a self-signed certificate in the `caddy/certs` directory:

```bash
openssl req -x509 -newkey rsa:4096 -keyout minio.key -out minio.crt -days 365 -nodes
```


### Configure MinIO

Copy the `minio/.env.example` file to `minio/.env` and set the desired values for the variables.

```bash
cp minio/.env.example minio/.env
```

### Run the services

After following all previous steps, you can run the services using Docker Compose:

```bash
docker compose up -d
```

After running the above command, you can access the MinIO web interface at [http://localhost:9001]. The credentials are the ones specified in the `minio/.env` file.

### Create a Bucket and Upload Files

1. Access the MinIO web interface at [http://localhost:9001].
2. Log in using the credentials specified in the `minio/.env` file.
3. Create a new bucket (e.g., `test-bucket`).
4. Upload some files to the bucket.

### Accessing MinIO API

The API should be available at [https://minio.local] or [http://localhost:9000]. Files in public buckets can be accessed at [https://minio.local/your-bucket-name/your-file-name].
