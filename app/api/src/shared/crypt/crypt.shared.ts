import * as crypt from 'bcrypt';

const ENCRYPT_SALTED_ROUND = 10 as const;

export const encryptSalt = (str: string): string => {
  return crypt.hashSync(str, ENCRYPT_SALTED_ROUND);
};

export const encryptSaltCompare = (raw: string, salted: string) => {
  return crypt.compareSync(raw, salted);
};
