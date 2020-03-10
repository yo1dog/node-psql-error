const ExtendableError      = require('@yo1dog/extendable-error');
const pgBuildErrorMessage3 = require('./translated/pgBuildErrorMessage3');
const psqlConst            = require('./translated/psqlConst');
const util                 = require('util');

const ERROR_FIELD_TOKEN_NAME_PAIRS = [
  [psqlConst.PG_DIAG_SEVERITY,              'severity'            ],
  [psqlConst.PG_DIAG_SEVERITY_NONLOCALIZED, 'severityNonlocalized'],
  [psqlConst.PG_DIAG_SQLSTATE,              'code'                ],
  [psqlConst.PG_DIAG_MESSAGE_PRIMARY,       'message'             ],
  [psqlConst.PG_DIAG_MESSAGE_DETAIL,        'detail'              ],
  [psqlConst.PG_DIAG_MESSAGE_HINT,          'hint'                ],
  [psqlConst.PG_DIAG_STATEMENT_POSITION,    'position'            ],
  [psqlConst.PG_DIAG_INTERNAL_POSITION,     'internalPosition'    ],
  [psqlConst.PG_DIAG_INTERNAL_QUERY,        'internalQuery'       ],
  [psqlConst.PG_DIAG_CONTEXT,               'where'               ],
  [psqlConst.PG_DIAG_SCHEMA_NAME,           'schema'              ],
  [psqlConst.PG_DIAG_TABLE_NAME,            'table'               ],
  [psqlConst.PG_DIAG_COLUMN_NAME,           'column'              ],
  [psqlConst.PG_DIAG_DATATYPE_NAME,         'dataType'            ],
  [psqlConst.PG_DIAG_CONSTRAINT_NAME,       'constraint'          ],
  [psqlConst.PG_DIAG_SOURCE_FILE,           'file'                ],
  [psqlConst.PG_DIAG_SOURCE_LINE,           'line'                ],
  [psqlConst.PG_DIAG_SOURCE_FUNCTION,       'routine'             ],
];

class PSQLError extends ExtendableError {
  /**
   * @param {Error | Partial<IPSQLErrorFields>} origErrFieldsObj 
   * @param {string | IQuery | null} [query]
   * @param {IPSQLErrorMessageOptions | null} [options]
   */
  constructor(origErrFieldsObj, query, options) {
    const errFieldsObj = formatErrorFieldsObj(origErrFieldsObj);
    query = formatQuery(query);
    
    /** @type {Object<string, any>} */
    const meta = {};
    const message = PSQLError.createMessage(errFieldsObj, query, options, meta);
    super(message);
    
    for (const key in errFieldsObj) {
      if (key === 'name' || key === 'message') continue;
      this.setUnenumerable(key, errFieldsObj[key]);
    }
    
    this.setUnenumerable('query', query);
    this.setUnenumerable('queryPositionDetail', meta.queryPositionDetail || null);
    this.setUnenumerable('errFieldsObj', errFieldsObj);
    this.setUnenumerable('origErrFieldsObj', origErrFieldsObj);
  }
  
  /**
   * @param {Error | Partial<IPSQLErrorFields>} origErrFieldsObj 
   * @param {string | IQuery | null} [query]
   * @param {IPSQLErrorMessageOptions | null} [options]
   * @param {Object<string, any> | null} [meta]
   * @returns {string}
   */
  static createMessage(origErrFieldsObj, query, options, meta) {
    const errFieldsObj = formatErrorFieldsObj(origErrFieldsObj);
    query = formatQuery(query);
    options = options || {};
    
    const verbosityLevel   = typeof options.verbosityLevel   === 'number'? options.verbosityLevel   : psqlConst.PQERRORS_VERBOSE;
    const showContextLevel = typeof options.showContextLevel === 'number'? options.showContextLevel : psqlConst.PQSHOW_CONTEXT_ERRORS;
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
    
    /** @type {IQuery | null} */
    let formatedQuery = null;
    if (!hideQuery && query) {
      formatedQuery = {};
      
      if (!hideQueryText && typeof query.text !== 'undefined') {
        formatedQuery.text = query.text;
      }
      if (!hideQueryValues && typeof query.values !== 'undefined') {
        formatedQuery.values = query.values;
      }
    }
    
    let msg = errorMsg;
    if (formatedQuery) {
      msg += `\nQUERY:  ${util.inspect(formatedQuery)}`;
    }
    
    return msg;
  }
}
PSQLError.psqlConst = psqlConst;

module.exports = PSQLError;


/**
 * @param {any} origErrFieldsObj
 * @returns {IPSQLErrorFields}
 */
function formatErrorFieldsObj(origErrFieldsObj) {
  /** @type {any} */
  const errFieldsObj = {};
  if (!origErrFieldsObj) {
    return errFieldsObj;
  }
  
  for (const [token, name] of ERROR_FIELD_TOKEN_NAME_PAIRS) {
    const tokenVal = toNullableString(origErrFieldsObj[token]);
    const nameVal  = toNullableString(origErrFieldsObj[name ]);
    const val = tokenVal !== null? tokenVal : nameVal;
    
    errFieldsObj[token] = val;
    errFieldsObj[name ] = val;
  }
  
  return errFieldsObj;
}

/**
 * @param {any} query
 * @returns {IQuery}
 */
function formatQuery(query) {
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

/**
 * @param {any} val
 * @returns {string | null}
 */
function toNullableString(val) {
  if (typeof val === 'undefined' || val === null) {
    return null;
  }
  if (typeof val === 'string') {
    return val;
  }
  return String(val);
}