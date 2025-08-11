-- ! SQL COMMANDS TO REMEMBER

-- * SQL is not case sensitive (including the strings between '')
-- Primary key (PK): the key that identifies a value/row in a table
-- Foreign key (FK): the key that refer to a value/row from another table, refering to primary key of him


-- ! Query manipulation

-- * SELECT : Query selection to get data

SELECT * 
  FROM tableA

SELECT columnA,columnB
  FROM tableA

-- * DISTINCT : Avoid duplicated data (cant use * )

SELECT DISTINCT columnA,columnB
  FROM tableA

SELECT DISTINCT columnA
  FROM tableA

-- * STRING MANIPULATION : *not a command* methods to manipulate the output of a text
-- ASCII; CHAR; CHARINDEX; CONCAT; CONCAT_WS; DIFFERENCE; FORMAT; LEFT; LEN; LOWER; LTRIM; NCHAR; PATINDEX; QUOTENAME; REPLACE; REPLICATE; REVERSE; RIGHT; RTRIM; SOUNDEX; SPACE; STR; STRING_AGG; STRING_ESCAPE; STRING_SPLIT; STUFF; SUBSTRING; TRANSLATE; TRIM; UNICODE; UPPER

SELECT
  CONCAT(columnA, ' ', columnB, ' - ', columnC) AS 'full name - birth', -- ' ' and ' - ' is used to separate the fields
  UPPER(columnA), LOWER(columnB), -- Upper/lower case
  LEN(columnA), -- Length (chars count)
  SUBSTRING(columnA, 3, 2), -- Substring getting from index, the equivalent chars quantity (start from 1) (ex: 'ABCDEF' => 'CD')
  REPALCE(columnA, ' ', '-') -- Replace all ' ' (spaces) to '-'
FROM tableA

-- * ARITHMETIC METHODS : *not a command*

SELECT columnNumberA * columnNumberB AS 'multiply' -- methods: + ; - ; / ; * ; ^
  FROM tableA

SELECT ROUND(columnNumber, 2) -- 2 is the decimal precision, filling the remeaning of 6 decimal places with 0 (ex: 1.990000 ; 2.120000)
  FROM tableA

SELECT SQRT(columnNumber) -- The square root (^2)
  FROM tableA

-- * AGGREGATION METHODS : *not a command* used to group values
-- COUNT; MIN; MAX; SUM; AVG

SELECT COUNT(*) -- total length lines
  FROM tableA

SELECT SUM(numberColumn) -- SUM all the values
  FROM tableA

SELECT MIN(numberColumn) -- get the MIN value
  FROM tableA

SELECT MAX(numberColumn) -- get the MXA value
  FROM tableA

SELECT AVG(numberColumn) -- get the averange (AVG) value
  FROM tableA

-- * TOP : The first top rows

SELECT TOP 10 *
  FROM tableA

-- * ORDER BY : Eesult order (ASC = A-Z / DESC = Z-A) (the column on ORDER BY needs to be included in select)

SELECT * 
  FROM tableA
  ORDER BY columnA ASC

SELECT * 
  FROM tableA
  ORDER BY columnA ASC, columnB DESC

SELECT TOP 100 *
  FROM tableA
  ORDER BY SUM(columnA) DESC

-- * Pagination : *not a command* used to paginate quereis

SELECT *
  FROM tableA
  ORDER BY columnA
  LIMIT 10 OFFSET 20 -- Skip the first 20 rows, returning the next 10 rows

-- * AS : Alias to column (if it is not sigle word, ensure to use '')

SELECT COUNT(*) AS 'total rows'
  FROM tableA

SELECT columnA AS cA, columnB AS cB
  FROM tableA

-- * WHERE : Filter data (operators: = < > >= <= <> AND OR )

SELECT * 
  FROM tableA
  WHERE columnA = 'str'
    AND columnB <> 'test'

SELECT *
  FROM tableA
  WHERE columnA < 100
    OR columnA > 1000

SELECT *
  FROM tableA
  WHERE (columnA = 'a' OR columnA = 'b')
    AND NOT (columnB LIKE '%a%' OR columnB LIKE '%b%'

-- * BETWEEN / NOT BETWEEN / IS NULL

SELECT *
  FROM tableA
  WHERE columnA IS NULL

SELECT *
  FROM tableA
  WHERE columnA NOT BETWEEN 10 AND 100 -- => <10 && >100

SELECT *
  FROM tableA
  WHERE columnA BETWEEN '2000/01/01' AND '2000/12/31'

-- * IN : Column in a set of values

SELECT *
  FROM tableA
  WHERE columnA IN ('value1', 'value')

SELECT *
  FROM tableA
  WHERE columnA IN (SELECT columnA FROM tableA) -- with subselection (section below)

-- * LIKE : Filter text (% = ANY/NONE ; _ = SINGLE ANY)

SELECT *
  FROM tableA
  WHERE columnA LIKE '%sTr%'

SELECT *
  FROM tableA
  WHERE columnA LIKE 'stR_nG'

-- * GROUP BY : Divide the result in groups. For each group, can be applyed an aggregation method

SELECT columnA, SUM(numberColumn) AS 'sum'
  FROM tableA
  GROUP BY columnA
-- SUM all 'numberColumn' from a single 'columnA', joining all with the same 'columnA' value following the SUM of its 'numberColumn'

SELECT columnA, COUNT(columnA) AS 'total'
  FROM tableA
  GROUP BY columnA
-- Group all the same values of 'columnA', and count the lines of each of them

-- * HAVING : Filter the GROUP BY (like a WHERE for GROUP BY, but applied AFTER grouped the data by aggregation methods)
-- Note: the aggregation methods cant be used in WHERE

SELECT columnA, COUNT(columnA) AS 'length'
  FROM tableA
  GROUP BY columnA
  HAVING COUNT(columnA) BETWEEN 10 AND 100
-- Group all the 'columnA' values with the total of each of them. But only where the total is > 10 and < 100

-- * JOINS : unify two tables, associating first table's fk to last table's pk
-- Note: if there arent corresponding values on both tables, it will fill with NULL
-- SQL Join diagram: https://i.sstatic.net/4zjxm.png
-- LEFT JOIN / LEFT OUTER JOIN: focus on first table (left table) (if empty field, fill with NULL on right table)
--   tableA + (tableA u tableB): SELECT * FROM tableA A LEFT JOIN tableB B ON A.key = B.key
--   tableA - (tableA u tableB): SELECT * FROM tableA A LEFT JOIN tableB B ON A.key = B.key WHERE B.key IS NULL
-- RIGHT JOIN: focus on last table (right table) (if empty field, fill with NULL on left table)
--   tableB + (tableA u tableB): SELECT * FROM tableA A RIGHT JOIN tableB B ON A.key = B.key
--   tableB - (tableA u tableB): SELECT * FROM tableA A RIGHT JOIN tableB B ON A.key = B.key WHERE A.key IS NULL
-- INNER JOIN: union of A and B (tableA u tableB)
--   tableA u tableB: SELECT * FROM tableA A INNER JOIN tableB B ON A.key = B.key
-- FULL OUTER JOIN: both tables (if empty field, fill with NULL on both tables)
--   tableA + tableB: SELECT * FROM tableA A FULL OUTER JOIN tableB B ON A.key = B.key
--   tableA + tableB - (tableA u tableB): SELECT * FROM tableA A FULL OUTER JOIN tableB B ON A.key = B.key WHERE A.key IS NULL OR B.key IS NULL

-- INNER JOIN examples : Join two tables using keys/ids (fk pointing to pk)

SELECT A.columnA, A.columnB, B.columnA, B.columnB
  FROM tableA AS A -- The 'AS' is optional
  INNER JOIN tableB B ON A.foreignKey = B.primaryKey

SELECT * -- All columns of both tables
  FROM tableA A
  INNER JOIN tableB B ON A.foreignKey = B.primaryKey

-- * SELF-JOIN : *not a command* used to compare inside the same table
-- It will output like in two columns the following data (each is a row): AB AC AD BA BD CA DA DB

SELECT A.columnA, AA.columnB
  FROM tableA A, tableA AA -- Comparing 'columnA' with the same 'columnA' of the same table ('tableA')
  WHERE A.columnA = AA.columnA
-- All the 'columnA' and 'columnB' where the 'columnA' fields is the same

-- * UNION / UNION ALL : unify more than one SELECT commands (UNION = remove repeated data / UNION ALL = keep repeated data)
-- It fills the empty fields with NULL. Usualy used on inconsistent tables

SELECT columnA, columnB
  FROM tableA
  WHERE columnC = 'str'
UNION -- Can use UNION ALL to repeat rows
SELECT columnA, columnB
  FROM tableA
  WHERE columnD LIKE 'a%'

-- * SUBQUERY / SUBSELECT : *not a command* used to make a query selection inside another query selection

SELECT *
  FROM tableA
  WHERE columnNumber > (
    SELECT AVG(columnNumber) -- Get the AVG of a column, and result in all rows where 'columnNumber' > this AVG
      FROM tableA
  )

SELECT columnA
  FROM tableA
  WHERE foreignKey IN (
    SELECT primaryKey
      FROM tableB
      WHERE columnB = 'test' -- Get all 'primaryKey' from 'tableB' with 'columnB' = 'test', then result in all 'columnA' from 'tableA' that contains the keys
  )
SELECT A.columnA -- SAME AS the above SELECT, just another way to do the same (compare if it is faster/slower) 
  FROM tableA A
  INNER JOIN tableB B ON A.foreignKey = B.primaryKey
  AND B.columnB = 'test'

-- * DATEPART : datetime query
-- PARAM1: year (yy, yyyy); quarter (qq, q), month (mm, m), dayofyear (dy, y), day (dd, d), week (wk, ww), weekday (dw), hour (hh), minute (mi, n), second (ss, s), millisecond (ms), microsecond (mcs), nanosecond (ns), tzoffset (tz), iso_week (isowk, isoww),

SELECT columnA, DATEPART(MONTH, columnDate) AS 'month'
  FROM tableA

SELECT columnA, DATEPART(YY, columnDate) AS 'year'
  FROM tableA

SELECT AVG(columnNumber), DATEPART(DW, columnDate) AS 'weekday'
  FROM tableA
  GROUP BY DATEPART(DW, columnDate) -- Grouping all the same 'weekday' and getting the AVG of each 'weekday'
  ORDER BY 'weekday'

-- ! DDL (Data Definition Language)
-- Restrictions: NOT NULL; UNIQUE; PRIMARY KEY; FOREIGN KEY; CHECK (specific condition); DEFAULT (set default value)
-- Data types:
--   BOOL
--   CHAR(size) : fixed char length (always filling the full storage) (from 0 to 255, default is 1)
--   VARCHAR(size) : variable char length (from 0 to 65535)
--   TINYINT : integer (1 byte)
--   SMALLINT : integer (2 bytes)
--   INT : integer (4 bytes)
--   BIGINT : integer (8 bytes)
--   NUMERIC(totalDigits, decimalDigits) / DECIMAL(totalDigits, decimalDigits) : fraction numbers
--   FLOAT / REAL : precision of 15 decimal places (not for money/currency, due to float inaccuracy)
--   DATE : yyyy/mm/dd
--   TIME : hh:mm:ss.SSSSSSS
--   DATETIME : yyyy-MM-ddTHH:mm:ss
--   DATETIME2 : yyyy-MM-ddTHH:mm:ss.mmm
--   SMALLDATETIME : yyyy-MM-ddTHH:mm:ss with range 1900/01/09 to 2079/06/06
--   DATETIMEOFFSET : DATETIME + time zone

-- * Create table

CREATE TABLE tableA (
  columnA INT PRIMARY KEY,
  columnX BIGINT NOT NULL AUTO_INCREMENT, -- * Note: different DB has different names: AUTOINCREMENT; SERIA; GENERATED; ...
  columnB VARCHAR(150) NOt NULL, -- Max of 150 chars
  columnC INT DEFAULT 0,
  columnD DATETIME,
  columnE FOREIGN KEY REFERENCES tableB(columnA), -- Can create FK
  columnF VARCHAR(255),
  columnG INT NOT NULL UNIQUE, -- Force to be unice value in this table's column
  columnH BIT DEFAULT 0,
  columnI INT CHECK(columnI >= 10)
)

CREATE TABLE tableA (
  columnA INT PRIMARY KEY,
  FOREIGN KEY (columnB) -- FK options: used to apply update/delete to this table ('tableA') when referenced table is updated/deleted
    REFERENCES tableB(columnA)
    ON DELETE RESTRICT -- ON DELETE is optional
    ON UPDATE CASCADE -- ON UPDATE is optional
    -- * Options: 
    -- *   RESTRICT: deny referenced table action
    -- *   CASCADE: delete/update referenced fields
    -- *   SET NULL: set FK as NULL
    -- *   NO ACTION: keep old value on FK
    -- *   SET DEFAULT: updates to default value (requires to use 'DEFAULT' value on FK field, and that this value exists on referenced table)
)

CREATE TABLE tableA (
  columnA BIGINT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (columnA) -- Can set PK here
) AUTO_INCREMENT=100 -- Optional: begin increment from 100

SELECT * -- Copy the columns and all its data to a new table that is created now
  INTO newTable
  FROM tableA

-- * Update table structure

ALTER TABLE tableA
  ADD newColumn INT -- Add new column
  ALTER COLUMN columnA INT NOT NULL -- Change an existing column

EXEC sp_RENAME 'tableA.columnA', 'newColumnName', 'COLUMN' -- Rename column

EXEC sp_RENAME 'tableA', 'newTableName' -- Rename table

-- * Delete table
-- Only table that is not referenced by other tables

DROP TABLE tableA

-- * Views : virtual table to be viewed using another table's datas (this table can be used in a normal query (SELECT))
-- It doesnt create a table, it is a virtual table that doesnt store data itself, only used to view stored data from other tables

CREATE VIEW viewName AS -- Query after 'AS'
  SELECT columnA, columnB, columnC
    FROM tableA
    WHERE columnA = 'a'

-- ! DML (Data Manipulation Language)

-- * Insert data/row

INSERT INTO tableA(columnA, columnB, columnC) -- Can ignore columns with default value
VALUES
  (valueA1, valueB1, valueC1) -- Same length of 'INSERT INTO' columns
  (valueA2, valueB2, valueC2)
  (valueA3, , valueC3) -- Empty value in case it has a default

INSERT INTO tableA(columnA) -- Insert column from 'tableB' into 'tableA'
SELECT columnA
  FROM tableB

-- * Update data/row

UPDATE tableA
SET columnA = newValueA
    columnB = newValueB
WHERE columnA = 'abc' -- REMEMBER TO USE 'WHERE' to not update ALL the rows

-- * Delete data/row

DELETE FROM tableA
WHERE columnA = 'abc' -- REMEMBER TO USE 'WHERE' to not update ALL the rows

TRUNCATE TABLE tableA -- Also delete all rows, but fester and reset increment count (LESS SAFE: no 'WHERE', no rollback)

