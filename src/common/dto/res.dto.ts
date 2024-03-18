import { ApiProperty } from '@nestjs/swagger';

export class PageResponseDto<TData> {
  @ApiProperty({ required: true })
  page: number;

  @ApiProperty({ required: true })
  size: number;

  items: TData[];

  constructor(page, size, items) {
    this.page = page;
    this.size = size;
    this.items = items;
  }
}

export class HttpResponseDto<TData, TError> {
  success: boolean;
  data?: TData;
  error?: TError;

  constructor(success = true, data = null, error = null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
