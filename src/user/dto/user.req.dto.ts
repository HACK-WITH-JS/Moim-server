import { ApiProperty } from '@nestjs/swagger';
import { PositionOpenStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class LinkInputDto {
  @ApiProperty({ required: true, example: 'www.naver.com' })
  url: string;

  @ApiProperty({ required: true, example: '설명' })
  description: string;
}

export class UpdateUserRequestDto {
  @ApiProperty({ required: true, example: 'test@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: '도레미' })
  @IsNotEmpty()
  nickName: string;

  @ApiProperty({ required: true, example: '/' })
  @IsNotEmpty()
  profileImageUrl: string;

  @ApiProperty({ required: true, example: 'NONE' })
  @IsNotEmpty()
  position: string;

  @ApiProperty({ required: true, example: 'NONE' })
  @IsNotEmpty()
  positionOpenStatus: PositionOpenStatus;

  @ApiProperty({ required: true, example: '5' })
  @IsNotEmpty()
  carrer: number;

  @ApiProperty({ required: false, example: '자기소개입니다람쥐' })
  @IsNotEmpty()
  introduce: string;

  @ApiProperty({
    type: [String],
    required: true,
    example: '[typescript, javascript]',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  stacks: string[];

  @ApiProperty({
    type: [LinkInputDto],
    required: false,
    example: '[{link: www.naver.com description: 네이버}]',
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @Type(() => LinkInputDto)
  links: LinkInputDto[];
}
