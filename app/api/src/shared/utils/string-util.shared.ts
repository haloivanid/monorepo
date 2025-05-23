export function Str(str: string): { snakeCase: () => string; camelCase: (firstCapital?: boolean) => string } {
  return {
    snakeCase: () => {
      // Handle null/undefined and empty string
      if (str == null || str.length === 0) return '';

      return str
        .replace(/[\s-]+/g, '_')
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
        .toLowerCase()
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '');
    },

    camelCase: (firstCapital: boolean = false) => {
      if (str == null || str.length === 0) return ''; // Handle null/undefined and empty string

      str = str.trim();
      str = str.replace(/[\s-_]+$/g, '');

      if (str.length === 0) return '';
      if (firstCapital) str = '_' + str;
      if (str === str.toUpperCase()) str = str.toLowerCase();

      return str.replace(/^([A-Z])|[\s-_](\w)/g, function (_, p1: string, p2: string) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();
      });
    },
  };
}
