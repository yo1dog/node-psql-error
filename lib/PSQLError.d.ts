import ExtendableError from '@yo1dog/extendable-error';


export class PSQLError extends ExtendableError implements IPSQLErrorFields {
  public constructor(
    /**
     * `pg` error or any other object that contains the PostgreSQL error message
     * fields via either human readable keys or the single-byte identification
     * tokens.
     */
    errFieldsObj: Error | Partial<IPSQLErrorFields>,
    /** Query that caused the error. */
    query?: string | IQuery | null,
    options?: IPSQLErrorMessageOptions | null
  );
  
  /** Query that caused the error. */
  public query: IQuery;
  /**
   * **!! beta. Consider unstable. !!** Details about the query position reported in the
   * error. This field may be null in unexpected situations. It is only set when the
   * verbosity is `PQERRORS_VERBOSE` and is only set by the constructor.
   */
  public queryPositionDetail: IQueryPositionDetail | null;
  /**
   * Object containing the PostgreSQL error message field values via both human
   * readable keys and the single-byte identification token. These properties are also
   * accessible from the error itself, but the values in this object are guaranteed
   * to be the original unmodified values. Currently, this only applies to the
   * 'message' property as its value is replaced with the full generated user error
   * message.
   */
  public errFieldsObj: IPSQLErrorFields;
  /**
   * The original error fields object passed to the constructor. For example, if
   * this error wrapped a `pg` error, `origErrFieldsObj` is that `pg` error.
   */
  public origErrFieldsObj: Error | Partial<IPSQLErrorFields>;
  
  /**
   * Recreates and resets the error's message with the given options. Useful if you
   * want to alter the message after the `PSQLError` instance has been created. For
   * example, if you want to change the verbosity or remove the full query.
   */
  public resetMessage(options?: IPSQLErrorMessageOptions | null): this;
  
  /**
   * Creates and returns an error message. Useful if you want to create the error
   * message without creating a `PSQLError` instance. Used internally by the
   * `PSQLError` constructor.
   */
  public static createMessage(
    /**
     * `pg` error or any other object that contains the PostgreSQL error message
     * fields via either human readable keys or the single-byte identification
     * tokens.
     */
    errFieldsObj: Error | Partial<IPSQLErrorFields>,
    /** Query that caused the error. */
    query?: string | IQuery | null,
    options?: IPSQLErrorMessageOptions | null
  ): string;
  
  public static psqlConst: IPSQLConst;
}


export interface IQuery {
  /** Text of the query. */
  text?: string | null;
  /** Values used for variable substitution. */
  values?: any[] | null;
}

export interface IPSQLErrorMessageOptions {
  /**
   * Level of verbosity. Use one of `PSQLError.psqlConst.PQERRORS_*`. Defaults to
   * `PQERRORS_VERBOSE`.
   */
  verbosityLevel?: PSQLErrorVerbosityLevel | null;
  /**
   * When to show context in the error message. Use one of
   * `PSQLError.psqlConst.PQSHOW_CONTEXT_*`. Defaults to `PQSHOW_CONTEXT_NEVER`.
   * 
   * **NOTE:** `pg` does not currently support the `V` (Nonlocalized Severity) field.
   * Further, this field is only returned by PostgreSQL server 9.6 and up. This field
   * is used for checking if context should be shown. Therefore, if you are wraping
   * `pg` errors or using PostgreSQL server 9.5 or lower, `PQSHOW_CONTEXT_ERRORS` will
   * differ from the original functionality and will show context for all errors instead
   * of only fatal ones. In these situations, `PQSHOW_CONTEXT_ERRORS` and
   * `PQSHOW_CONTEXT_ALWAYS` are equivalent.
   */
  showContextLevel?: PSQLErrorContextLevel | null;
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
 * https://www.postgresql.org/docs/12/protocol-error-fields.html
 */
export interface IPSQLErrorFields {
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... or a localized translation of one of these. Always present. */
  public severity: string | null;
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... or a localized translation of one of these. Always present. */
  public S: string | null;
  
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... This is identical to the `S` field except that the contents are never localized. This is present only in messages generated by PostgreSQL versions 9.6 and later. */
  public severityNonlocalized: string | null;
  /** Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... This is identical to the `S` field except that the contents are never localized. This is present only in messages generated by PostgreSQL versions 9.6 and later. */
  public V: string | null;
  
  /** Code: the SQLSTATE code for the error (see [Appendix A](https://www.postgresql.org/docs/12/errcodes-appendix.html)). Not localizable. Always present. */
  public code: string | null;
  /** Code: the SQLSTATE code for the error (see [Appendix A](https://www.postgresql.org/docs/12/errcodes-appendix.html)). Not localizable. Always present. */
  public C: string | null;
  
  /** Message: the primary human-readable error message. This should be accurate but terse (typically one line). Always present. */
  public message: string | null;
  /** Message: the primary human-readable error message. This should be accurate but terse (typically one line). Always present. */
  public M: string | null;
  
  /** Detail: an optional secondary error message carrying more detail about the problem. Might run to multiple lines. */
  public detail: string | null;
  /** Detail: an optional secondary error message carrying more detail about the problem. Might run to multiple lines. */
  public D: string | null;
  
  /** Hint: an optional suggestion what to do about the problem. This is intended to differ from Detail in that it offers advice (potentially inappropriate) rather than hard facts. Might run to multiple lines. */
  public hint: string | null;
  /** Hint: an optional suggestion what to do about the problem. This is intended to differ from Detail in that it offers advice (potentially inappropriate) rather than hard facts. Might run to multiple lines. */
  public H: string | null;
  
  /** Position: the field value is a decimal ASCII integer, indicating an error cursor position as an index into the original query string. The first character has index 1, and positions are measured in characters not bytes. */
  public position: string | null;
  /** Position: the field value is a decimal ASCII integer, indicating an error cursor position as an index into the original query string. The first character has index 1, and positions are measured in characters not bytes. */
  public P: string | null;
  
  /** Internal position: this is defined the same as the `P` field, but it is used when the cursor position refers to an internally generated command rather than the one submitted by the client. The `q` field will always appear when this field appears. */
  public internalPosition: string | null;
  /** Internal position: this is defined the same as the `P` field, but it is used when the cursor position refers to an internally generated command rather than the one submitted by the client. The `q` field will always appear when this field appears. */
  public p: string | null;
  
  /** Internal query: the text of a failed internally-generated command. This could be, for example, a SQL query issued by a PL/pgSQL function. */
  public internalQuery: string | null;
  /** Internal query: the text of a failed internally-generated command. This could be, for example, a SQL query issued by a PL/pgSQL function. */
  public q: string | null;
  
  /** Where: an indication of the context in which the error occurred. Presently this includes a call stack traceback of active procedural language functions and internally-generated queries. The trace is one entry per line, most recent first. */
  public where: string | null;
  /** Where: an indication of the context in which the error occurred. Presently this includes a call stack traceback of active procedural language functions and internally-generated queries. The trace is one entry per line, most recent first. */
  public W: string | null;
  
  /** Schema name: if the error was associated with a specific database object, the name of the schema containing that object, if any. */
  public schema: string | null;
  /** Schema name: if the error was associated with a specific database object, the name of the schema containing that object, if any. */
  public s: string | null;
  
  /** Table name: if the error was associated with a specific table, the name of the table. (Refer to the schema name field for the name of the table's schema.) */
  public table: string | null;
  /** Table name: if the error was associated with a specific table, the name of the table. (Refer to the schema name field for the name of the table's schema.) */
  public t: string | null;
  
  /** Column name: if the error was associated with a specific table column, the name of the column. (Refer to the schema and table name fields to identify the table.) */
  public column: string | null;
  /** Column name: if the error was associated with a specific table column, the name of the column. (Refer to the schema and table name fields to identify the table.) */
  public c: string | null;
  
  /** Data type name: if the error was associated with a specific data type, the name of the data type. (Refer to the schema name field for the name of the data type's schema.) */
  public dataType: string | null;
  /** Data type name: if the error was associated with a specific data type, the name of the data type. (Refer to the schema name field for the name of the data type's schema.) */
  public d: string | null;
  
  /** Constraint name: if the error was associated with a specific constraint, the name of the constraint. Refer to fields listed above for the associated table or domain. (For this purpose, indexes are treated as constraints, even if they weren't created with constraint syntax.) */
  public constraint: string | null;
  /** Constraint name: if the error was associated with a specific constraint, the name of the constraint. Refer to fields listed above for the associated table or domain. (For this purpose, indexes are treated as constraints, even if they weren't created with constraint syntax.) */
  public n: string | null;
  
  /** File: the file name of the source-code location where the error was reported. */
  public file: string | null;
  /** File: the file name of the source-code location where the error was reported. */
  public F: string | null;
  
  /** Line: the line number of the source-code location where the error was reported. */
  public line: string | null;
  /** Line: the line number of the source-code location where the error was reported. */
  public L: string | null;
  
  /** Routine: the name of the source-code routine reporting the error. */
  public routine: string | null;
  /** Routine: the name of the source-code routine reporting the error. */
  public R: string | null;
  
  public [key: string] : string | null;
}

export enum PSQLErrorContextLevel {}
export enum PSQLErrorVerbosityLevel {}

export interface IPSQLConst {
  public PQSHOW_CONTEXT_NEVER : PSQLErrorContextLevel;
  public PQSHOW_CONTEXT_ERRORS: PSQLErrorContextLevel;
  public PQSHOW_CONTEXT_ALWAYS: PSQLErrorContextLevel;
  
  public PQERRORS_TERSE   : PSQLErrorVerbosityLevel;
  public PQERRORS_DEFAULT : PSQLErrorVerbosityLevel;
  public PQERRORS_VERBOSE : PSQLErrorVerbosityLevel;
  public PQERRORS_SQLSTATE: PSQLErrorVerbosityLevel;
  
  public PG_DIAG_SEVERITY             : string;
  public PG_DIAG_SEVERITY_NONLOCALIZED: string;
  public PG_DIAG_SQLSTATE             : string;
  public PG_DIAG_MESSAGE_PRIMARY      : string;
  public PG_DIAG_MESSAGE_DETAIL       : string;
  public PG_DIAG_MESSAGE_HINT         : string;
  public PG_DIAG_STATEMENT_POSITION   : string;
  public PG_DIAG_INTERNAL_POSITION    : string;
  public PG_DIAG_INTERNAL_QUERY       : string;
  public PG_DIAG_CONTEXT              : string;
  public PG_DIAG_SCHEMA_NAME          : string;
  public PG_DIAG_TABLE_NAME           : string;
  public PG_DIAG_COLUMN_NAME          : string;
  public PG_DIAG_DATATYPE_NAME        : string;
  public PG_DIAG_CONSTRAINT_NAME      : string;
  public PG_DIAG_SOURCE_FILE          : string;
  public PG_DIAG_SOURCE_LINE          : string;
  public PG_DIAG_SOURCE_FUNCTION      : string;
}

export = PSQLError;