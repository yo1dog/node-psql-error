declare interface IPGResult {
 errorFieldsObj: IPSQLErrorFields;
 queryText     : string | null;
}

declare module 'wcwidth.js' {
  function wcwidth(str: string): number;
  function wcwidth(codePoint: number): number;
  export = wcwidth;
}
