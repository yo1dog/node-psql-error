import pgBuildErrorMessage3 from './translated/pgBuildErrorMessage3';
import {PGContextVisibility, PGVerbosity, PGFieldCode} from './translated/psqlConst';
import psqlErrorCodeDict, {PGCodeCondition} from './psqlErrorCodeDict';
import {inspect} from 'util';

const ERROR_FIELD_TOKEN_NAME_PAIRS: [PGFieldCode, keyof IPSQLErrorFields][] = [
  [PGFieldCode.PG_DIAG_SEVERITY,              'severity'            ],
  [PGFieldCode.PG_DIAG_SEVERITY_NONLOCALIZED, 'severityNonlocalized'],
  [PGFieldCode.PG_DIAG_SQLSTATE,              'code'                ],
  [PGFieldCode.PG_DIAG_MESSAGE_PRIMARY,       'message'             ],
  [PGFieldCode.PG_DIAG_MESSAGE_DETAIL,        'detail'              ],
  [PGFieldCode.PG_DIAG_MESSAGE_HINT,          'hint'                ],
  [PGFieldCode.PG_DIAG_STATEMENT_POSITION,    'position'            ],
  [PGFieldCode.PG_DIAG_INTERNAL_POSITION,     'internalPosition'    ],
  [PGFieldCode.PG_DIAG_INTERNAL_QUERY,        'internalQuery'       ],
  [PGFieldCode.PG_DIAG_CONTEXT,               'where'               ],
  [PGFieldCode.PG_DIAG_SCHEMA_NAME,           'schema'              ],
  [PGFieldCode.PG_DIAG_TABLE_NAME,            'table'               ],
  [PGFieldCode.PG_DIAG_COLUMN_NAME,           'column'              ],
  [PGFieldCode.PG_DIAG_DATATYPE_NAME,         'dataType'            ],
  [PGFieldCode.PG_DIAG_CONSTRAINT_NAME,       'constraint'          ],
  [PGFieldCode.PG_DIAG_SOURCE_FILE,           'file'                ],
  [PGFieldCode.PG_DIAG_SOURCE_LINE,           'line'                ],
  [PGFieldCode.PG_DIAG_SOURCE_FUNCTION,       'routine'             ],
];


export class PSQLError<T extends Error | Partial<IPSQLErrorFields>> extends Error implements IPSQLErrorFields {
  public severity            !: string | null; public S!: string | null;
  public severityNonlocalized!: string | null; public V!: string | null;
  public code                !: string | null; public C!: string | null;
  /*public mesasge           !: string;*/      public M!: string | null; 
  public detail              !: string | null; public D!: string | null;
  public hint                !: string | null; public H!: string | null;
  public position            !: string | null; public P!: string | null;
  public internalPosition    !: string | null; public p!: string | null;
  public internalQuery       !: string | null; public q!: string | null;
  public where               !: string | null; public W!: string | null;
  public schema              !: string | null; public s!: string | null;
  public table               !: string | null; public t!: string | null;
  public column              !: string | null; public c!: string | null;
  public dataType            !: string | null; public d!: string | null;
  public constraint          !: string | null; public n!: string | null;
  public file                !: string | null; public F!: string | null;
  public line                !: string | null; public L!: string | null;
  public routine             !: string | null; public R!: string | null;
  
  /**
   * PSQL condition name for the error code.
   * 
   * https://www.postgresql.org/docs/13/errcodes-appendix.html
   */
  public codeCondition!: PGCodeCondition | null;
  
  /** Query that caused the error. */
  public query!: IQuery;
  /**
   * **!! beta. Consider unstable. !!** Details about the query position reported in the
   * error. This field may be null in unexpected situations. It is only set when the
   * verbosity is `PQERRORS_VERBOSE`.
   */
  public queryPositionDetail!: IQueryPositionDetail | null;
  /**
   * Object containing the PostgreSQL error message field values via both human
   * readable keys and the single-byte identification token. These properties are also
   * accessible from the error itself, but the values in this object are guaranteed
   * to be the original unmodified values. Currently, this only applies to the
   * 'message' property as its value is replaced with the full generated user error
   * message.
   */
  public errFieldsObj!: IPSQLErrorFields;
  /**
   * The original error fields object passed to the constructor. For example, if
   * this error wrapped a `pg` error, `origErrFieldsObj` is that `pg` error.
   */
  public origErrFieldsObj!: T;
  
  constructor(
    /**
     * `pg` error or any other object that contains the PostgreSQL error message
     * fields via either human readable keys or the single-byte identification
     * tokens.
     */
    origErrFieldsObj: T,
    /** Query that caused the error. */
    query?: string | IQuery | null,
    options?: IPSQLErrorMessageOptions | null
  ) {
    const errFieldsObj = formatErrorFieldsObj(origErrFieldsObj);
    query = formatQuery(query);
    
    const meta: IPSQLErrorMessageMeta = {};
    const message = PSQLError.createMessage(errFieldsObj, query, options, meta);
    super(message);
    Object.defineProperty(this, 'name', {enumerable: false, value: this.constructor.name});
    
    for (const key in errFieldsObj) {
      if (key === 'name' || key === 'message') continue;
      Object.defineProperty(this, key, {enumerable: false, value: errFieldsObj[key as keyof IPSQLErrorFields]});
    }
    
    Object.defineProperty(this, 'codeCondition', {enumerable: false, value: errFieldsObj.code? psqlErrorCodeDict[errFieldsObj.code] : null});
    Object.defineProperty(this, 'query', {enumerable: false, value: query});
    Object.defineProperty(this, 'queryPositionDetail', {enumerable: false, value: (!meta.isInternalQuery && meta.queryPositionDetail) || null});
    Object.defineProperty(this, 'errFieldsObj', {enumerable: false, value: errFieldsObj});
    Object.defineProperty(this, 'origErrFieldsObj', {enumerable: false, value: origErrFieldsObj});
  }
  
  static PGContextVisibility = PGContextVisibility;
  static PGVerbosity = PGVerbosity;
  static PGFieldCode = PGFieldCode;
  static PGCodeCondition = PGCodeCondition;
  
  /**
   * Creates and returns an error message. Useful if you want to create the error
   * message without creating a `PSQLError` instance. Used internally by the
   * `PSQLError` constructor.
   */
  static createMessage(
    /**
     * `pg` error or any other object that contains the PostgreSQL error message
     * fields via either human readable keys or the single-byte identification
     * tokens.
     */
    origErrFieldsObj: Error | Partial<IPSQLErrorFields>,
    /** Query that caused the error. */
    query?: string | IQuery | null,
    options?: IPSQLErrorMessageOptions | null,
    meta?: IPSQLErrorMessageMeta | null
  ) {
    const errFieldsObj = formatErrorFieldsObj(origErrFieldsObj);
    query = formatQuery(query);
    options = options || {};
    
    const verbosityLevel   = typeof options.verbosityLevel   === 'number'? options.verbosityLevel   : PGVerbosity.PQERRORS_VERBOSE;
    const showContextLevel = typeof options.showContextLevel === 'number'? options.showContextLevel : PGContextVisibility.PQSHOW_CONTEXT_ERRORS;
    const hideQuery        = options.hideQuery;
    const hideQueryText    = options.hideQueryText;
    const hideQueryValues  = options.hideQueryValues;
    
    const errorMsg = pgBuildErrorMessage3(
      {
        errFieldsObj,
        queryText: toNullableString(query.text)
      },
      verbosityLevel,
      showContextLevel,
      meta
    ).trimRight() || (origErrFieldsObj && toNullableString(origErrFieldsObj.message)) || errFieldsObj.M || '';
    
    let queryMsg;
    let valuesMsg;
    if (!hideQuery && query) {
      if (!hideQueryText && typeof query.text !== 'undefined') {
        queryMsg = buildQueryTextMessage(query.text, meta);
      }
      if (!hideQueryValues && typeof query.values !== 'undefined') {
        valuesMsg = buildQueryValuesMessage(query.values);
      }
    }
    
    let msg = errorMsg;
    if (queryMsg) {
      msg += '\n' + queryMsg;
    }
    if (valuesMsg) {
      if (queryMsg) msg += '\n';
      msg += '\n' + valuesMsg;
    }
    return msg;
  }
}


function formatErrorFieldsObj(origErrFieldsObj: any): IPSQLErrorFields {
  const errFieldsObj: Partial<IPSQLErrorFields> = {};
  
  for (const [token, name] of ERROR_FIELD_TOKEN_NAME_PAIRS) {
    const tokenVal = origErrFieldsObj? toNullableString(origErrFieldsObj[token]) : null;
    const nameVal  = origErrFieldsObj? toNullableString(origErrFieldsObj[name ]) : null;
    const val = tokenVal !== null? tokenVal : nameVal;
    
    errFieldsObj[token] = val;
    errFieldsObj[name ] = val;
  }
  
  return errFieldsObj as IPSQLErrorFields;
}

function formatQuery(query: any): IQuery {
  if (typeof query === 'string') {
    return {
      text: query
    };
  }
  if (query) {
    return {
      text: query.text,
      values: query.values
    };
  }
  return {};
}

function buildQueryTextMessage(text: string | null, meta?: IPSQLErrorMessageMeta | null) {
  let msg = `QUERY:`;
  if (typeof text !== 'string' || text.length === 0) {
    return msg + '  ' + inspect(text);
  }
  
  const lines = text.replace(/\t/g, ' ').split(/\r\n|\r|\n/);
  const maxLineNumStrLen = lines.length.toString().length;
  const queryPositionDetail = meta && meta.queryPositionDetail;
  
  for (let i = 0; i < lines.length; ++i) {
    msg += '\n';
    
    const lineNumStr = (i + 1).toString();
    const numPadding = maxLineNumStrLen - lineNumStr.length;
    if (numPadding > 0) {
      msg += ' '.repeat(numPadding);
    }
    msg += ' ' + lineNumStr + ': ' + lines[i];
    
    if (queryPositionDetail && i === queryPositionDetail.lineNum - 1) {
      msg += (
        '\n '
        + '═'.repeat(
          maxLineNumStrLen
          + 1 // ':'
          + 1 // ' '
          + queryPositionDetail.screenCol
        )
        + '╛'
      );
    }
  }
  
  return msg;
}
function buildQueryValuesMessage(values: unknown) {
   return `VALUES:  ${inspect(values)}`;
}

function toNullableString(val: unknown) {
  if (typeof val === 'undefined' || val === null) {
    return null;
  }
  if (typeof val === 'string') {
    return val;
  }
  return String(val);
}



export interface IQuery {
  /** Text of the query. */
  text?: string | null;
  /** Values used for variable substitution. */
  values?: any[] | null;
}

export interface IPSQLErrorMessageOptions {
  /**
   * Level of verbosity. Use one of `PSQLError.PGVerbosity.*`. Defaults to
   * `PQERRORS_VERBOSE`.
   */
  verbosityLevel?: PGVerbosity | null;
  /**
   * When to show context in the error message. Use one of
   * `PSQLError.PGContextVisibility.*`. Defaults to `PQSHOW_CONTEXT_NEVER`.
   * 
   * **NOTE:** `pg` does not currently support the `V` (Nonlocalized Severity) field.
   * Further, this field is only returned by PostgreSQL server 9.6 and up. This field
   * is used for checking if context should be shown. Therefore, if you are wraping
   * `pg` errors or using PostgreSQL server 9.5 or lower, `PQSHOW_CONTEXT_ERRORS` will
   * differ from the original functionality and will show context for all errors instead
   * of only fatal ones. In these situations, `PQSHOW_CONTEXT_ERRORS` and
   * `PQSHOW_CONTEXT_ALWAYS` are equivalent.
   */
  showContextLevel?: PGContextVisibility | null;
  /**
   * If the full query text should not be shown in error message. Defaults to
   * false.
   */
  hideQueryText?: boolean | null;
  /**
   * If the query values should not be shown in error message. Defaults to false.
   */
  hideQueryValues?: boolean | null;
  /**
   * If the full query should not be shown in error message. Equivalent to setting
   * both `hideQueryText` and `hideQueryValues` to true. Defaults to false.
   */
  hideQuery?: boolean | null;
}

/**
 * Represents the location of a targeted character within the query text.
 * 
 * "unit index" refers to the offset of code **units** since the start of the string. "point index"
 * refers to the offset of code **points** since the start of the string. These may differ due to
 * certain characters (surrogate pairs) which use 2 code units to form a single a code point to
 * represent a single character.
 * 
 * "unit index" is the index in the string. "point index" can be thought of as the number of
 * "characters" since the start of the string.
 */
export interface IQueryPositionDetail {
  /** Line number the target is on. (1-based). */
  lineNum: number;
  /** Character number of target relative to the start of the line. (1-based). Equal to `(pointIndex - lineStartPointIndex) + 1` */
  charNum: number;
  
  /** Index of the target. */
  unitIndex: number;
  /** Character offset of the target. */
  pointIndex: number;
  /**
   * The screen column the target visually appears on when rendered to console. Assumes tabs have
   * been replaced with single spaces.
   */
  screenCol: number;
  
  /** Index of the first character of the line the target is on. */
  lineStartUnitIndex: number;
  /** Offset of first character of the line the target is on. */
  lineStartPointIndex: number;
  /** Index after the last character of the line the target is on. */
  lineEndUnitIndex: number;
  /** Offset after the last character of the line the target is on. */
  lineEndPointIndex: number;
}

/**
 * https://www.postgresql.org/docs/13/protocol-error-fields.html
 */
export interface IPSQLErrorFields {
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... or a localized translation of one of these. Always present. */
  severity: string | null;
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... or a localized translation of one of these. Always present. */
  S: string | null;
  
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... This is identical to the `S` field except that the contents are never localized. This is present only in messages generated by PostgreSQL versions 9.6 and later. */
  severityNonlocalized: string | null;
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... This is identical to the `S` field except that the contents are never localized. This is present only in messages generated by PostgreSQL versions 9.6 and later. */
  V: string | null;
  
  /** Code: the SQLSTATE code for the error (see [Appendix A](https://www.postgresql.org/docs/13/errcodes-appendix.html)). Not localizable. Always present. */
  code: string | null;
  /** Code: the SQLSTATE code for the error (see [Appendix A](https://www.postgresql.org/docs/13/errcodes-appendix.html)). Not localizable. Always present. */
  C: string | null;
  
  /** Message: the primary human-readable error message. This should be accurate but terse (typically one line). Always present. */
  message: string | null;
  /** Message: the primary human-readable error message. This should be accurate but terse (typically one line). Always present. */
  M: string | null;
  
  /** Detail: an optional secondary error message carrying more detail about the problem. Might run to multiple lines. */
  detail: string | null;
  /** Detail: an optional secondary error message carrying more detail about the problem. Might run to multiple lines. */
  D: string | null;
  
  /** Hint: an optional suggestion what to do about the problem. This is intended to differ from Detail in that it offers advice (potentially inappropriate) rather than hard facts. Might run to multiple lines. */
  hint: string | null;
  /** Hint: an optional suggestion what to do about the problem. This is intended to differ from Detail in that it offers advice (potentially inappropriate) rather than hard facts. Might run to multiple lines. */
  H: string | null;
  
  /** Position: the field value is a decimal ASCII integer, indicating an error cursor position as an index into the original query string. The first character has index 1, and positions are measured in characters not bytes. */
  position: string | null;
  /** Position: the field value is a decimal ASCII integer, indicating an error cursor position as an index into the original query string. The first character has index 1, and positions are measured in characters not bytes. */
  P: string | null;
  
  /** Internal position: this is defined the same as the `P` field, but it is used when the cursor position refers to an internally generated command rather than the one submitted by the client. The `q` field will always appear when this field appears. */
  internalPosition: string | null;
  /** Internal position: this is defined the same as the `P` field, but it is used when the cursor position refers to an internally generated command rather than the one submitted by the client. The `q` field will always appear when this field appears. */
  p: string | null;
  
  /** Internal query: the text of a failed internally-generated command. This could be, for example, a SQL query issued by a PL/pgSQL function. */
  internalQuery: string | null;
  /** Internal query: the text of a failed internally-generated command. This could be, for example, a SQL query issued by a PL/pgSQL function. */
  q: string | null;
  
  /** Where: an indication of the context in which the error occurred. Presently this includes a call stack traceback of active procedural language functions and internally-generated queries. The trace is one entry per line, most recent first. */
  where: string | null;
  /** Where: an indication of the context in which the error occurred. Presently this includes a call stack traceback of active procedural language functions and internally-generated queries. The trace is one entry per line, most recent first. */
  W: string | null;
  
  /** Schema name: if the error was associated with a specific database object, the name of the schema containing that object, if any. */
  schema: string | null;
  /** Schema name: if the error was associated with a specific database object, the name of the schema containing that object, if any. */
  s: string | null;
  
  /** Table name: if the error was associated with a specific table, the name of the table. (Refer to the schema name field for the name of the table's schema.) */
  table: string | null;
  /** Table name: if the error was associated with a specific table, the name of the table. (Refer to the schema name field for the name of the table's schema.) */
  t: string | null;
  
  /** Column name: if the error was associated with a specific table column, the name of the column. (Refer to the schema and table name fields to identify the table.) */
  column: string | null;
  /** Column name: if the error was associated with a specific table column, the name of the column. (Refer to the schema and table name fields to identify the table.) */
  c: string | null;
  
  /** Data type name: if the error was associated with a specific data type, the name of the data type. (Refer to the schema name field for the name of the data type's schema.) */
  dataType: string | null;
  /** Data type name: if the error was associated with a specific data type, the name of the data type. (Refer to the schema name field for the name of the data type's schema.) */
  d: string | null;
  
  /** Constraint name: if the error was associated with a specific constraint, the name of the constraint. Refer to fields listed above for the associated table or domain. (For this purpose, indexes are treated as constraints, even if they weren't created with constraint syntax.) */
  constraint: string | null;
  /** Constraint name: if the error was associated with a specific constraint, the name of the constraint. Refer to fields listed above for the associated table or domain. (For this purpose, indexes are treated as constraints, even if they weren't created with constraint syntax.) */
  n: string | null;
  
  /** File: the file name of the source-code location where the error was reported. */
  file: string | null;
  /** File: the file name of the source-code location where the error was reported. */
  F: string | null;
  
  /** Line: the line number of the source-code location where the error was reported. */
  line: string | null;
  /** Line: the line number of the source-code location where the error was reported. */
  L: string | null;
  
  /** Routine: the name of the source-code routine reporting the error. */
  routine: string | null;
  /** Routine: the name of the source-code routine reporting the error. */
  R: string | null;
}

export interface IPSQLErrorMessageMeta {
  isInternalQuery?: boolean;
  queryPositionDetail?: IQueryPositionDetail;
}

export default PSQLError;