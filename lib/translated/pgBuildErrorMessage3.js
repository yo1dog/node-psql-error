// translated from ../../original/pqBuildErrorMessage3.c
const psqlConst = require('./psqlConst');
const reportErrorPosition = require('./reportErrorPosition');

/**
 * @param {IPGResult} res
 * @param {PSQLErrorVerbosityLevel} verbosity
 * @param {PSQLErrorContextLevel} showContext
 * @param {Object<string, any> | null} [meta]
 * @returns {string}
 */
module.exports = function pgBuildErrorMessage3(res, verbosity, showContext, meta) {
  let msg = '';
  
  /** @type {string | null} */ let val = null;
  /** @type {string | null} */ let queryText = null;
  let queryPos = 0;
  
  // If we couldn't allocate a PGresult, just say "out of memory"
  // NOTE: this should not happen. We will return empty string instead
  if (!res) {
    return '';
  }
  
  /*
   * If we don't have any broken-down fields, just return the base message.
   * This mainly applies if we're given a libpq-generated error result.
   */
  // NOTE: this should not happen. We will return empty string instead
  if (!res.errorFieldsObj) {
    return '';
  }
  
  // Else build error message from relevant fields
  val = pqResultErrorField(res, psqlConst.PG_DIAG_SEVERITY);
  if (val !== null) msg += `${val}:  `;
  
  if (verbosity === psqlConst.PQERRORS_SQLSTATE) {
    /*
     * If we have a SQLSTATE, print that and nothing else.  If not (which
     * shouldn't happen for server-generated errors, but might possibly
     * happen for libpq-generated ones), fall back to TERSE format, as
     * that seems better than printing nothing at all.
     */
    val = pqResultErrorField(res, psqlConst.PG_DIAG_SQLSTATE);
    if (val) {
      msg += `${val}\n`;
      return msg;
    }
    verbosity = psqlConst.PQERRORS_TERSE;
  }
  
  if (verbosity === psqlConst.PQERRORS_VERBOSE) {
    val = pqResultErrorField(res, psqlConst.PG_DIAG_SQLSTATE);
    if (val !== null) msg += `${val}:  `;
  }
  
  val = pqResultErrorField(res, psqlConst.PG_DIAG_MESSAGE_PRIMARY);
  if (val !== null) msg += val;
  
  val = pqResultErrorField(res, psqlConst.PG_DIAG_STATEMENT_POSITION);
  if (val !== null) {
    if (verbosity !== psqlConst.PQERRORS_TERSE && res.queryText !== null) {
      // emit position as a syntax cursor display
      queryText = res.queryText;
      queryPos = parseInt(val, 10);
    }
    else {
      // emit position as text addition to primary message
      msg += ` at character ${val}`;
    }
  }
  else {
    val = pqResultErrorField(res, psqlConst.PG_DIAG_INTERNAL_POSITION);
    if (val !== null) {
      queryText = pqResultErrorField(res, psqlConst.PG_DIAG_INTERNAL_QUERY);
      if (verbosity !== psqlConst.PQERRORS_TERSE && queryText !== null) {
        // emit position as a syntax cursor display
        queryPos = parseInt(val, 10);
      }
      else {
        // emit position as text addition to primary message
        msg += ` at character ${val}`;
      }
    }
  }
  
  msg += '\n';
  
  if (verbosity !== psqlConst.PQERRORS_TERSE) {
    if (queryText && queryPos > 0) {
      msg += (reportErrorPosition(queryText, queryPos, meta) || '');
    }
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_MESSAGE_DETAIL);
    if (val !== null) msg += `DETAIL:  ${val}\n`;
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_MESSAGE_HINT);
    if (val !== null) msg += `HINT:  ${val}\n`;
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_INTERNAL_QUERY);
    if (val !== null) msg += `QUERY:  ${val}\n`;
    
    if (
      showContext === psqlConst.PQSHOW_CONTEXT_ALWAYS || (
        showContext === psqlConst.PQSHOW_CONTEXT_ERRORS &&
        // NOTE: We do not have reliable acess to the result status or severity. PG_DIAG_SEVERITY
        // may be localized and PG_DIAG_SEVERITY_NONLOCALIZED is only set by PostgreSQL 9.6 and up
        // and is not currently exposed in pg errors.
        // We will differ from the original functionality and show context if
        // PG_DIAG_SEVERITY_NONLOCALIZED is 'FATAL' or NULL
        (
          pqResultErrorField(res, psqlConst.PG_DIAG_SEVERITY_NONLOCALIZED) === 'FATAL' ||
          pqResultErrorField(res, psqlConst.PG_DIAG_SEVERITY_NONLOCALIZED) === null
        )
      )
    ) {
      val = pqResultErrorField(res, psqlConst.PG_DIAG_CONTEXT);
      if (val !== null) msg += `CONTEXT:  ${val}\n`;
    }
  }
  
  if (verbosity === psqlConst.PQERRORS_VERBOSE) {
    val = pqResultErrorField(res, psqlConst.PG_DIAG_SCHEMA_NAME);
    if (val !== null) msg += `SCHEMA NAME:  ${val}\n`;
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_TABLE_NAME);
    if (val !== null) msg += `TABLE NAME:  ${val}\n`;
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_COLUMN_NAME);
    if (val !== null) msg += `COLUMN NAME:  ${val}\n`;
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_DATATYPE_NAME);
    if (val !== null) msg += `DATATYPE NAME:  ${val}\n`;
    
    val = pqResultErrorField(res, psqlConst.PG_DIAG_CONSTRAINT_NAME);
    if (val !== null) msg += `CONSTRAINT NAME:  ${val}\n`;
  }
  
  if (verbosity === psqlConst.PQERRORS_VERBOSE) {
    /** @type {string | null} */ let valf = null;
    /** @type {string | null} */ let vall = null;
    
    valf = pqResultErrorField(res, psqlConst.PG_DIAG_SOURCE_FILE);
    vall = pqResultErrorField(res, psqlConst.PG_DIAG_SOURCE_LINE);
    val  = pqResultErrorField(res, psqlConst.PG_DIAG_SOURCE_FUNCTION);
    
    if (val !== null || valf !== null || vall !== null) {
      msg += 'LOCATION:  ';
      if (val !== null) {
        msg += `${val}, `;
      }
      if (valf !== null && vall !== null) { // unlikely we'd have just one
        msg += `${valf}:${vall}`;
      }
      msg += '\n';
    }
  }
  
  return msg;
};

/**
 * @param {IPGResult} res 
 * @param {string} fieldCode 
 * @returns {string | null}
 */
function pqResultErrorField(res, fieldCode) {
  if (!res) return null;
  return res.errorFieldsObj[fieldCode];
}