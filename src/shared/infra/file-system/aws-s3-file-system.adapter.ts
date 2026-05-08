import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { IFileSystem } from '~/shared/infra/contracts/file-system'

export class AwsS3FileSystemAdapter implements IFileSystem {
  private client: S3Client
  private bucketName: string
  private isPublic: boolean

  constructor(config: {
    accessKeyId: string
    secretAccessKey: string
    region: string
    bucketName: string
    isPublic?: boolean
  }) {
    this.client = new S3Client({
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      region: config.region,
    })
    this.bucketName = config.bucketName
    this.isPublic = config.isPublic || false
  }

  getStorageName(): string {
    return this.bucketName
  }

  async getFileUrl({ filePath }: IFileSystem.GetUrl): IFileSystem.GetUrlOutput {
    if (this.isPublic) return `https://${this.bucketName}.s3.amazonaws.com/${filePath}`
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filePath,
    })
    return getSignedUrl(this.client, command, {
      expiresIn: 3600,
    })
  }

  async upload(props: IFileSystem.Input): IFileSystem.Output {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: `${props.filePath}/${props.fileName}`,
      Body: props.file,
    })
    await this.client.send(command)
    return `https://${this.bucketName}.s3.amazonaws.com/${props.fileName}`
  }

  async download(props: { fileName: string; filePath: string }): Promise<Uint8Array | undefined> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: props.filePath,
    })
    const response = await this.client.send(command)
    if (!response) throw new Error('File not found')
    return response.Body?.transformToByteArray()
  }
}
