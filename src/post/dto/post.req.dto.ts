import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty({ required: true, example: '제목' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: true, example: '내용' })
  content: string;

  @ApiProperty({ required: true, example: 'PROJECT | STUDY' })
  @IsNotEmpty()
  postType: string; // 모집 구분

  @ApiProperty({ required: true, example: '모집 인원' })
  recruits: number;

  @ApiProperty({ required: true, example: 'ONLINE | OFFLINE | ONOFFLINE' })
  @IsNotEmpty()
  onOffStatus: string;

  @ApiProperty({
    required: true,
    example: 'OPEN_KAKAO_TLAK | EMAIL | GOOGLE_FORM',
  })
  @IsNotEmpty()
  contactType: string; // 연락 방식

  @ApiProperty({ required: true, example: 'NONE' })
  @IsNotEmpty()
  contactMethod: string;

  @ApiProperty({ required: true, example: '2021-01-01' })
  @IsNotEmpty()
  expectedPeriod: string;

  // PostTechStack
  @ApiProperty({
    type: [String],
    required: true,
    example: '[typescript, javascript]',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  stacks: string[];

  // PostTPosition
  @ApiProperty({
    type: [String],
    required: true,
    example: '[프론트엔드, 백엔드, 데브옵스]',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  positions: string[];
}
