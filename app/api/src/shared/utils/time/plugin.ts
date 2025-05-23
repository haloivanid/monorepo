import dayjs, { Dayjs } from 'dayjs';

export const hasPassed = (_o: any, c: typeof Dayjs, d: typeof dayjs) => {
  const proto = c.prototype;
  proto.hasPassed = function () {
    return d().isAfter(this);
  };
};
