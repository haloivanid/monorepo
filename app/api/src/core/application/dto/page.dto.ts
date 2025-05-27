export class PageParamDto {
  page: number;
  size: number;
}

export class ResponsePageMetaDto {
  page: number;
  size: number;
  totalItem: number;
  totalPage: number;
}

export class ResponsePageDto<T> {
  items: T[];
  meta: ResponsePageMetaDto;
}
