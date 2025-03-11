# MinIO demo

- [MinIO Docker Deployment Docs](https://min.io/docs/minio/container/index.html)
- [MinIO on Docker Hub](https://hub.docker.com/r/minio/minio)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Docker
- Docker Compose

### Environment Variables

Copy the `minio/.env.example` file to `minio/.env` and set the desired values for the variables.

```bash
cp minio/.env.example minio/.env
```

### Running the Services

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

The API should be available at [http://localhost:9000]. Files in public buckets can be accessed at [http://localhost:9000/your-bucket-name/your-file-name].

## Going into Production

In production, you should consider deploying MinIO in a [multi-node multi-drive configuration](https://min.io/docs/minio/linux/operations/install-deploy-manage/deploy-minio-multi-node-multi-drive.html). You can also use Kubernetes if your infrasctructure is already using it.

You can run a demo of the multi-node multi-drive configuration using Docker Compose by running the following command:

```bash
docker compose -f multi-node.compose.yml up -d
```
