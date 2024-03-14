import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { AWS_CONSTANT } from 'src/constant/aws.constant';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { basename, extname } from 'path';

export const S3ConfigFactory = (
  configService: ConfigService,
): MulterOptions => {
  const s3 = new S3Client({
    region: configService.get(AWS_CONSTANT.AWS_REGION),
    credentials: {
      accessKeyId: configService.get(AWS_CONSTANT.AWS_S3_ACCESS_KEY),
      secretAccessKey: configService.get(AWS_CONSTANT.AWS_S3_SECRET_KEY),
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: configService.get(AWS_CONSTANT.AWS_S3_BUCKET_NAME),
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        // 파일 업로드시 파일명 설정
        const ext = extname(file.originalname); // 확장자
        const baseName = basename(file.originalname, ext); // 확장자 제외
        // 파일이름-날짜.확장자
        const fileName =
          ext === '.mp4'
            ? `videos/${baseName}-${Date.now()}${ext}`
            : `images/${baseName}-${Date.now()}${ext}`;

        cb(null, fileName);
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
        files: 1,
      },
      fileFilter(req, file, callback) {
        callback(null, true);
      },
    }),
  };
};
