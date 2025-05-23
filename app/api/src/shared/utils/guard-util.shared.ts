import { isNumber, isString } from '@nestjs/common/utils/shared.utils';

export class GuardUtil {
  static isEmpty(value: any) {
    if (value == null) return true;
    if (value instanceof Object && Object.keys(value).length === 0) return true;
    if (Array.isArray(value)) {
      if (value.length === 0) return true;
      if (value.every((v) => GuardUtil.isEmpty(v))) return true;
    }
    if (isString(value) && value.length === 0) return true;
    if (isNaN(value)) return true;

    // Group "truthy" checks
    if (isNumber(value) || typeof value === 'boolean') return false;
    if (value instanceof Date) return false;

    return false;
  }

  static lengthIsBetween(value: number | string | Array<any>, min: number, max: number) {
    if (GuardUtil.isEmpty(value)) throw new Error('Value cannot be empty');
    const length = isNumber(value) ? Number(value).toString().length : value.length;
    return length >= min && length <= max;
  }
}
