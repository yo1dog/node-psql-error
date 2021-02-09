const pg = require('pg');
const client = new pg.Client('postgresql://localhost:5432/mike');
const {PSQLError} = require('@yo1dog/psql-error');

(async () => {
  await client.connect();
  
  await query({text: `
    SELECT * FROM sometable
    WHERE c = $1
  `, values: ['D']}
  );
  
  await query(
`SELECT a, b
FROM fubar
LEFT JOIN 1234 ON fu = 'bar'
WHERE a = 'a';`
  );
  
  await query(
`SELECT a, b
FROM fubar
WHERE a = 'a';`
  );
  
  await query(
`CREATE TEMP TABLE mytable (id INT, mycol INT NOT NULL);
INSERT INTO mytable VALUES (1, NULL);`
  );
  
  await query(
`CREATE TEMP TABLE parenttable (id INT PRIMARY KEY);
CREATE TEMP TABLE mytable (id INT, parent_id INT REFERENCES parenttable(id));
INSERT INTO mytable VALUES (1, -10);`
  );
  
  await query(
`CREATE TEMP TABLE mytable (id INT PRIMARY KEY);
INSERT INTO mytable VALUES (20), (20);`
  );
  
  await query(
`CREATE TEMP TABLE mytable (id INT, mycol INT UNIQUE);
INSERT INTO mytable VALUES (1, 10), (2, 10);`
  );
  
  await query(
`CREATE TEMP TABLE mytable (id INT, mycol INT CHECK (mycol > 0));
INSERT INTO mytable VALUES (1, -30);`
  );
})()
.catch(err => console.error(err))
.finally(() =>  client.end());

async function query(sql) {
  try {
    await client.query(sql);
  } catch(err) {
    const psqlErr = new PSQLError(err, sql);
    console.log(psqlErr);
    console.log(deleteFalsey({
      severity: psqlErr.severity,
      severityNonlocalized: psqlErr.severityNonlocalized,
      code: psqlErr.code,
      codeCondition: psqlErr.codeCondition,
      M: psqlErr.M,
      detail: psqlErr.detail,
      hint: psqlErr.hint,
      position: psqlErr.position,
      internalPosition: psqlErr.internalPosition,
      internalQuery: psqlErr.internalQuery,
      where: psqlErr.where,
      schema: psqlErr.schema,
      table: psqlErr.table,
      column: psqlErr.column,
      dataType: psqlErr.dataType,
      constraint: psqlErr.constraint,
      file: psqlErr.file,
      line: psqlErr.line,
      routine: psqlErr.routine,
    }));
    console.log('\n\n');
  }
}

function deleteFalsey(obj) {
  for (const key in obj) {
    if (!obj[key]) delete obj[key];
  }
  return obj;
}