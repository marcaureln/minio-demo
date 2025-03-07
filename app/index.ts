import 'dotenv/config';

import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
import * as fs from 'node:fs';
import * as path from 'node:path';


// Load and check environment variables
const { S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME } = process.env;

if (!S3_ENDPOINT || !S3_ACCESS_KEY || !S3_SECRET_KEY || !S3_BUCKET_NAME) {
    console.error('Missing environment variables.');
    process.exit(1);
}

// Get the file path from command-line arguments
const filePath = process.argv[2];

if (!filePath) {
    console.error('Error: Please provide a file path as an argument.');
    process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(filePath)) {
    console.error('Error: The file does not exist at the provided path.');
    process.exit(1);
}

// Detect MIME type
const mimeType = mime.lookup(filePath);
if (!mimeType) {
    console.error('Error: Could not determine MIME type for the file.');
    process.exit(1); // Exit if MIME type cannot be determined
}

// Configure AWS SDK for MinIO
const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(S3_ENDPOINT),
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    s3ForcePathStyle: true,  // Required for MinIO compatibility
    signatureVersion: 'v4',
    sslEnabled: S3_ENDPOINT.startsWith('https'), // Use HTTPS (true) or HTTP (false)
    region: 'us-east-1',  // You can use any region (MinIO doesn't check regions)
});

// Function to upload a file to MinIO
const uploadFileToS3 = async () => {
    const fileName = path.basename(filePath);
    const fileStream = fs.createReadStream(filePath);

    const params = {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,  // The key (file name) in the S3 bucket
        Body: fileStream,
        ContentType: mimeType,
    };

    try {
        const result = await s3.upload(params).promise();
        console.log('File uploaded successfully:', result);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

// Upload the file
uploadFileToS3();
