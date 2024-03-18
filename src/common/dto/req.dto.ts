import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

// TODO 나중에 조회리스트 구현할 때 추가 할 것
// 문자열로 들어오는 쿼리스트링을 숫자로 변환시켜줌 Transform
export class PageRequestDto {
  @ApiPropertyOptional({ description: '페이지 default = 1' })
  @Transform((param) => Number(param.value))
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: '페이지 당 데이터 개수' })
  @Transform((param) => Number(param.value))
  @IsInt()
  size?: number = 20;
}
