export class PaginationMetaDto {
  totalData: number;
  totalPage: number;
  currentPage: number;
  pageLimit: number;
}

export class BasePaginationDataDto<D extends Record<string, any>, T = D[] | null> {
  items: T;
  meta: PaginationMetaDto;
}

export class ErrorPayloadResponseDto {
  code: string;
  message: string;
  details?: string[];
}

export class BaseResponseDto<T extends Record<string, any> | null> {
  success: boolean;
  requestId: string;
  data: T;
  error: ErrorPayloadResponseDto | null;
}
