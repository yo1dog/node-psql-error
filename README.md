# psql-error

Better PostgreSQL errors.

```
npm install @yo1dog/psql-error
```

This library creates PostgreSQL errors with messages that emulate the `psql` client. In fact, the code for generating the error messages is translated directly from the [psql C source code](https://github.com/postgres/postgres/blob/REL_13_STABLE/src/interfaces/libpq/fe-protocol3.c#L985) with minimal modifications.

`PSQLError` can be used to wrap errors returned by `pg` and has the same interface/keys as `pg` errors for compatibility. It provides access to the [PostgreSQL error message fields](https://www.postgresql.org/docs/13/protocol-error-fields.html) for identifiable errors via both human readable keys (same as `pg` errors) and the single-byte identification token. This includes error code, table name, column name, constraint name, detail message, hint message, etc. 

Additionally, `PSQLError` maps PSQL error codes to their condition names for more human-friendly identification. This can be found here: https://www.postgresql.org/docs/13/errcodes-appendix.html#ERRCODES-TABLE

You can also include the query that caused the error. This allows `PSQLError` to capture and display information related to the query. For example, the offending snippet of the query can be included in the error message along with the line and character location.

Before:
```
syntax error at or near "1234"
```
After:
```
ERROR:  42601:  syntax error at or near "1234"
LINE 3: CHAR 11:
LEFT JOIN 1234 ON fu = 'bar'
          ^
QUERY:  {
  text: 'SELECT a, b\n' +
    'FROM fubar\n' +
    "LEFT JOIN 1234 ON fu = 'bar'\n' +
    "WHERE a = $1;"
  values: [ 'asdf' ]
}
```


## Quick Start

```javascript
const {PSQLError} = require('@yo1dog/psql-error');

const query = {
  text: `
    SELECT * FROM sometable
    WHERE c = $1
  `,
  values: ['D']
};
pgClient.query(query)
.catch(err => {
  const psqlErr = new PSQLError(err, query);
  // psqlErr.C    === '42P01';
  // psqlErr.code === '42P01';
  // psqlErr.codeCondition === 'undefined_table';
  // psqlErr.codeCondition === PSQLError.PGCodeCondition.undefined_table;
  throw psqlErr;
});
```

```
PSQLError: ERROR:  42P01:  relation "sometable" does not exist
LINE 2: CHAR 21:
      SELECT * FROM sometable
                    ^
LOCATION:  parserOpenTable, parse_relation.c:1160
QUERY:  {
  text: '\n' +
    '      SELECT * FROM sometable\n' +
    '      WHERE c = $1\n' +
    '    ',
  values: [ 'D' ]
}
    at Object.<anonymous> (README.js:13:3)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
```


# Docs

## Usage

### `new PSQLError(errFieldsObj, [query, [options]])`

 param                     | type             | description
---------------------------|------------------|-------------
`errFieldsObj`             | object           | `pg` error or any other object that contains the PostgreSQL error message fields via human readable keys or the single-byte identification tokens. See the Properties section below for the expected keys.
`query`                    | string or object | *(optional)* Query that caused the error. Either a query object or the query text as a string.
`query.text`               | string           | *(optional)* Text of the query.
`query.values`             | any[]            | *(optional)* Values used for variable substitution.
`options`                  | object           | *(optional)* See options below.

```javascript
new PSQLError({message: '...', severity: '...', code: '...'});
new PSQLError({M: '...', S: '...', C: '...'});
new PSQLError(pgError);
new PSQLError(pgError, query);
new PSQLError(pgError, query, {hideQueryValues: true});
new PSQLError(pgError, {text: query, values});
```


### `PSQLError.createMessage(errFieldsObj, [query, [options]])`

Parameters are the same as the constructor.

Creates and returns an error message. Useful if you want to create the error message without creating a `PSQLError` instance. Used internally by the `PSQLError` constructor.

You can recreate a `PSQLError` instance's message with different options like so:
```javascript
const psqlError = new PSQLError(pgError, query); // message contains query values
PSQLError.createMessage(psqlError, psqlError.query, {hideQueryValues: true}) // message does not contain query values
// OR
new PSQLError(psqlError, psqlError.query, {hideQueryValues: true});
```


### Options

key                | type    | description
-------------------|---------|------------
`verbosityLevel`   | number  | Level of verbosity. Use one of `PSQLError.PGVerbosity.*`. Defaults to `PQERRORS_VERBOSE`.
`showContextLevel` | number  | When to show context in the error message. Use one of `PSQLError.PGContextVisibility.*`. Defaults to `PQSHOW_CONTEXT_ERRORS`. See note bellow.
`hideQueryText`    | boolean | If the full query text should not be shown in error message. Defaults to false.
`hideQueryValues`  | boolean | If the query values should not be shown in error message. Defaults to false.
`hideQuery`        | boolean | If the full query should not be shown in error message. Equivalent to setting both `hideQueryText` and `hideQueryValues` to true. Defaults to false.

**NOTE:** `pg` does not currently support the `V` (Nonlocalized Severity) field. Further, this field is only returned by PostgreSQL server 9.6 and up. This field is used for checking if context should be shown. Therefore, if you are wraping `pg` errors or using PostgreSQL server 9.5 or lower, `PQSHOW_CONTEXT_ERRORS` will differ from the original functionality and will show context for all errors instead of only fatal ones. In these situations, `PQSHOW_CONTEXT_ERRORS` and `PQSHOW_CONTEXT_ALWAYS` are equivalent.


## Properties

key                   | type   | docs
----------------------|--------|-----
`query`               | object | Query that caused the error. Always an object.
`query.text`          | string | *(optional)* Text of the query.
`query.values`        | any[]  | *(optional)* Values used for variable substitution.
`codeCondition`       | string | *(optional)* The PSQL condition for the SQLSTATE code for the error. See below.
`errFieldsObj`        | object | Object containing the PostgreSQL error message field values via both human readable keys and the single-byte identification token. These properties are also accessible from the error itself, but the values in this object are guaranteed to be the original unmodified values. Currently, this only applies to the 'message' property as its value is replaced with the full generated user error message.
`origErrFieldsObj`    | object | The original error fields object passed to the constructor. For example, if this error wrapped a `pg` error, `origErrFieldsObj` is that `pg` error.
`queryPositionDetail` | object | **!! beta. Consider unstable. !!** Details about the query position reported in the error. This field may be null in unexpected situations. It is only set when the verbosity is `PQERRORS_VERBOSE` and is only set by the constructor.

All of the PostgreSQL error message fields can be accessed via either human readable keys or the single-byte identification token. This applies to both input parameters and `PSQLError` properties. These are listed below along with relevant documentation from the PostgreSQL docs. See: https://www.postgresql.org/docs/13/protocol-error-fields.html

Further, `PSQLError` maps the PSQL SQLSTATE code (`C`/`code`) to its PL/pgSQL condition name and exposes it as the `codeCondition` property (defined above). This makes errors easier to identify with more human-friendly names. The available condition names can be found at `PSQLError.PGCodeCondition.*` For example, you can identify a foreign key error with `psqlErr.code === '23503'`, `psqlErr.codeCondition === 'foreign_key_violation'`, or `psqlErr.codeCondition === PSQLError.PGCodeCondition.foreign_key_violation`. However, note that there are a few codes with the same condition name. This means you can map a code to a condition name but you can not map a condition name to a single code.

All are of type `string` and can be `null`.

human                  | token | docs
-----------------------|-------|-----
`severity`             | `S`   | Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... or a localized translation of one of these. Always present.
`severityNonlocalized` | `V`   | Severity: the field contents are `ERROR`, `FATAL`, or `PANIC` ... This is identical to the `S` field except that the contents are never localized. This is present only in messages generated by PostgreSQL versions 9.6 and later.<br><br>**NOTE:** `pg` errors do not currently support the `severityNonlocalized`/`V` field.
`code`                 | `C`   | Code: the SQLSTATE code for the error (see [Appendix A](https://www.postgresql.org/docs/13/errcodes-appendix.html)). Not localizable. Always present.
`message`              | `M`   | Message: the primary human-readable error message. This should be accurate but terse (typically one line). Always present.<br><br>**NOTE:** The `message` property of a `PSQLError` instance contains the full generated user error message and **not** the original PostgreSQL error message field value. To obtain the original value, either use `M`, `errFieldsObj.message`, or `errFieldsObj.M`.
`detail`               | `D`   | Detail: an optional secondary error message carrying more detail about the problem. Might run to multiple lines.
`hint`                 | `H`   | Hint: an optional suggestion what to do about the problem. This is intended to differ from Detail in that it offers advice (potentially inappropriate) rather than hard facts. Might run to multiple lines.
`position`             | `P`   | Position: the field value is a decimal ASCII integer, indicating an error cursor position as an index into the original query string. The first character has index 1, and positions are measured in characters not bytes.
`internalPosition`     | `p`   | Internal position: this is defined the same as the `P` field, but it is used when the cursor position refers to an internally generated command rather than the one submitted by the client. The `q` field will always appear when this field appears.
`internalQuery`        | `q`   | Internal query: the text of a failed internally-generated command. This could be, for example, a SQL query issued by a PL/pgSQL function.
`where`                | `W`   | Where: an indication of the context in which the error occurred. Presently this includes a call stack traceback of active procedural language functions and internally-generated queries. The trace is one entry per line, most recent first.
`schema`               | `s`   | Schema name: if the error was associated with a specific database object, the name of the schema containing that object, if any.
`table`                | `t`   | Table name: if the error was associated with a specific table, the name of the table. (Refer to the schema name field for the name of the table's schema.)
`column`               | `c`   | Column name: if the error was associated with a specific table column, the name of the column. (Refer to the schema and table name fields to identify the table.)
`dataType`             | `d`   | Data type name: if the error was associated with a specific data type, the name of the data type. (Refer to the schema name field for the name of the data type's schema.)
`constraint`           | `n`   | Constraint name: if the error was associated with a specific constraint, the name of the constraint. Refer to fields listed above for the associated table or domain. (For this purpose, indexes are treated as constraints, even if they weren't created with constraint syntax.)
`file`                 | `F`   | File: the file name of the source-code location where the error was reported.
`line`                 | `L`   | Line: the line number of the source-code location where the error was reported.
`routine`              | `R`   | Routine: the name of the source-code routine reporting the error.

**NOTE:** From PostgreSQL docs: The fields for schema name, table name, column name, data type name, and constraint name are supplied only for a limited number of error types; see [Appendix A](https://www.postgresql.org/docs/13/errcodes-appendix.html). Frontends should not assume that the presence of any of these fields guarantees the presence of another field. Core error sources observe the interrelationships noted above, but user-defined functions may use these fields in other ways. In the same vein, clients should not assume that these fields denote contemporary objects in the current database.

**NOTE:** The human readable keys match those used by `pg`. This allows you to pass `pg` errors directly into `PSQLError` and allows `PSQLError` to be compatibility with other libraries expecting `pg` errors.


## Examples

Here are some common errors and what the `PSQLError` message looks like:

### 42601: syntax_error
```
SELECT a, b
FROM fubar
LEFT JOIN 1234 ON fu = 'bar'
WHERE a = 'a';
```
```
ERROR:  42601:  syntax error at or near "1234"
LINE 3: CHAR 11:
LEFT JOIN 1234 ON fu = 'bar'
          ^
LOCATION:  scanner_yyerror, scan.l:1128
QUERY: ...
```


### 42P01: undefined_table
```
SELECT a, b
FROM fubar
WHERE a = 'a';
```
```
ERROR:  42P01:  relation "fubar" does not exist
LINE 2: CHAR 6:
FROM fubar
     ^
LOCATION:  parserOpenTable, parse_relation.c:1160
QUERY: ...
```


### 23502: not_null_violation
```
CREATE TABLE mytable (id INT, mycol INT NOT NULL);
INSERT INTO mytable VALUES (1, NULL);
```
```
ERROR:  23502:  null value in column "mycol" violates not-null constraint
DETAIL:  Failing row contains (1, null).
SCHEMA NAME:  public
TABLE NAME:  mytable
COLUMN NAME:  mycol
LOCATION:  ExecConstraints, execMain.c:1736
QUERY: ...
```


### 23503: foreign_key_violation
```
CREATE TABLE parenttable (id INT PRIMARY KEY);
CREATE TABLE mytable (id INT, parent_id INT REFERENCES parenttable);
INSERT INTO mytable VALUES (1, -10);
```
```
ERROR:  23503:  insert or update on table "mytable" violates foreign key constraint "mytable_parent_id_fkey"
DETAIL:  Key (parent_id)=(-10) is not present in table "parenttable".
SCHEMA NAME:  public
TABLE NAME:  mytable
CONSTRAINT NAME:  mytable_parent_id_fkey
LOCATION:  ri_ReportViolation, ri_triggers.c:3269
QUERY: ...
```


### 23505: unique_violation
Primary Key
```
CREATE TABLE mytable (id INT PRIMARY KEY);
INSERT INTO mytable VALUES (20), (20);
```
```
ERROR:  23505:  duplicate key value violates unique constraint "mytable_pkey"
DETAIL:  Key (id)=(20) already exists.
SCHEMA NAME:  public
TABLE NAME:  mytable
CONSTRAINT NAME:  mytable_pkey
LOCATION:  _bt_check_unique, nbtinsert.c:433
QUERY: ...
```

Unique Constraint
```
CREATE TABLE mytable (id INT, mycol INT UNIQUE);
INSERT INTO mytable VALUES (1, 10), (2, 10);
```
```
ERROR:  23505:  duplicate key value violates unique constraint "mytable_mycol_key"
DETAIL:  Key (mycol)=(10) already exists.
SCHEMA NAME:  public
TABLE NAME:  mytable
CONSTRAINT NAME:  mytable_mycol_key
LOCATION:  _bt_check_unique, nbtinsert.c:433
QUERY: ...
```


### 23514: check_violation
```
CREATE TABLE mytable (id INT, mycol INT CHECK (mycol > 0));
INSERT INTO mytable VALUES (1, -30);
```
```
ERROR:  23514:  new row for relation "mytable" violates check constraint "mytable_mycol_check"
DETAIL:  Failing row contains (1, -30).
SCHEMA NAME:  public
TABLE NAME:  mytable
CONSTRAINT NAME:  mytable_mycol_check
LOCATION:  ExecConstraints, execMain.c:1762
QUERY: ...
```


## Caveats

There are some potential display issues regarding unaccountable inconsistencies regarding character display and encoding:
- The line position may not exactly match your editor and/or terminal if the query contains abnormal line breaks. `psql` considers `\r`, `\n`, and `\r\n` line breaks.
- The character position may not exactly match your editor and/or terminal if the query contains certain "wide" characters or grapheme clusters. This is due to lack of standardization around handling the display width of these characters in fixed width environments and how grapheme clusters are counted. For example, your console/environment may display [Family: Man, Woman, Boy, Boy emoji](https://emojipedia.org/family-man-woman-boy-boy/) 👨‍👩‍👦‍👦 the same width as 1 character, 2 characters, 2.5, 11, etc. The character after may be considered to be at column/char 2, 3, 8, 12 etc. `PSQLError` follows `psql` and uses an implementation of [`wcwidth`](http://man7.org/linux/man-pages/man3/wcwidth.3.html) for calculating display width. This does not support grapheme clustering.

## Project Structure

All library files are in `/lib/`. Code translated from C is in `/lib/translated/`.

The original C code that was translated is kept in `/original/`. If/when the `psql` client code updates and we want to update this library along with it, we can diff the stored originals with the new versions. This will hopefully make updating the translated code easier.