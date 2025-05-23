import time from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import { hasPassed } from './plugin';

time.extend(timezone);
time.extend(utc);
time.extend(isBetween);
time.extend(hasPassed);

export { time };
