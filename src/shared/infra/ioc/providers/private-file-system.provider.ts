import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IFileSystem } from '~/shared/infra/contracts/file-system'
import { AwsS3FileSystemAdapter } from '~/shared/infra/file-system/aws-s3-file-system.adapter'
import { SharedProviderEnum } from '~/shared/infra/ioc/shared-provider.enum'

export class PrivateFileSystemProvider {
  static register(): Provider {
    return {
      provide: SharedProviderEnum.PUBLIC_FILE_SYSTEM,
      useFactory: async (configService: ConfigService): Promise<IFileSystem> => {
        return new AwsS3FileSystemAdapter({
          accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY'),
          secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
          region: configService.getOrThrow('AWS_REGION'),
          bucketName: configService.getOrThrow('AWS_PRIVATE_BUCKET_NAME'),
          isPublic: false,
        })
      },
      inject: [ConfigService],
    }
  }
}
