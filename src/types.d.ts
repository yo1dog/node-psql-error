/* eslint-disable @typescript-eslint/unified-signatures */
declare module 'wcwidth.js' {
  function wcwidth(str: string): number;
  function wcwidth(codePoint: number): number;
  export = wcwidth;
}
