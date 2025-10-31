import { Client } from 'minio';

const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
const port = Number(process.env.MINIO_PORT || 9000);
const useSsl = (process.env.MINIO_USE_SSL || 'false') === 'true';
const accessKey = process.env.MINIO_ACCESS_KEY || 'minioadmin';
const secretKey = process.env.MINIO_SECRET_KEY || 'minioadmin';
const bucket = process.env.MINIO_BUCKET || 'documents';

export const minioClient = new Client({
  endPoint: endpoint,
  port,
  useSSL: useSsl,
  accessKey,
  secretKey,
});

export const ensureBucket = async () => {
  try {
    const exists = await minioClient.bucketExists(bucket);
    if (!exists) {
      await minioClient.makeBucket(bucket, '');
      // eslint-disable-next-line no-console
      console.log(`MinIO bucket '${bucket}' created`);
    }

    // Set bucket policy to allow public read access
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucket}/*`]
        }
      ]
    };

    try {
      await minioClient.setBucketPolicy(bucket, JSON.stringify(policy));
      // eslint-disable-next-line no-console
      console.log(`MinIO bucket '${bucket}' set to public read`);
    } catch (policyErr) {
      // eslint-disable-next-line no-console
      console.warn('Warning: Could not set bucket policy. Files may not be publicly accessible:', policyErr);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error ensuring MinIO bucket:', err);
    throw err;
  }
};

export const getBucketName = () => bucket;

export const getPublicUrlForObject = (objectName: string): string => {
  // Build direct MinIO URL
  const protocol = useSsl ? 'https' : 'http';
  const portPart = (useSsl && port === 443) || (!useSsl && port === 80) ? '' : `:${port}`;
  
  // Return direct MinIO object URL
  return `${protocol}://${endpoint}${portPart}/${bucket}/${objectName}`;
};

export const getPresignedUrlForObject = async (objectName: string, expiresSeconds = 24 * 60 * 60): Promise<string> => {
  // Generate presigned URL for temporary access
  try {
    const url = await minioClient.presignedGetObject(getBucketName(), objectName, expiresSeconds);
    return url;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error generating presigned URL:', err);
    throw err;
  }
};
