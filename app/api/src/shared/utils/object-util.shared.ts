import { Str } from './string-util.shared';

export function isObject(obj: Record<string, any>): obj is Record<string, any> {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

function deepWalkTransform(obj: Record<string, any>, callback: (key: string) => string) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key] as never;

    if (isObject(value)) deepWalkTransform(value, callback);

    const transformedKey = callback(key);

    if (transformedKey !== key) {
      obj[transformedKey] = value;
      delete obj[key];
    }
  });
}

function walkTransform(obj: Record<string, any>, callback: (key: string) => string, isDeep: boolean) {
  if (isDeep) {
    deepWalkTransform(obj, callback);
    return obj;
  }

  Object.keys(obj).forEach((key) => {
    const newKey = callback(key);
    if (newKey !== key) {
      const value = obj[key] as never;

      obj[newKey] = value;
      delete obj[key];
    }
  });
}

export function Obj(obj: Record<string, any>): {
  sortKeys: (deepsort?: boolean) => Record<string, any>;
  keysToSnakeCase: (deeptransform?: boolean) => Record<string, any>;
  keysToCamelCase: (deeptransform?: boolean) => Record<string, any>;
} {
  return {
    sortKeys: (deepsort: boolean = false) => {
      const o: Record<string, any> = {};

      Object.keys(obj)
        .sort()
        .forEach((key) => {
          const newKey = Str(key).snakeCase();
          const value = obj[key] as never;

          if (deepsort && isObject(value)) {
            o[newKey] = Obj(value).sortKeys(deepsort);
          } else {
            o[newKey] = value;
            delete obj[key];
          }
        });

      return o;
    },

    keysToSnakeCase: (deeptransform: boolean = false) => {
      walkTransform(obj, (key: string) => Str(key).snakeCase(), deeptransform);
      return obj;
    },

    keysToCamelCase: (deeptransform: boolean = false) => {
      walkTransform(obj, (key: string) => Str(key).camelCase(), deeptransform);

      return obj;
    },
  };
}
