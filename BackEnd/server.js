const express = require("express");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "std",
  password: "admin",
  port: 5432,
});

app.use(express.json());

// Soft Delete

const softDeleteRecord = async (tablename, recordID) => {
  const query = `
  update ${tablename}
  set is_deleted = true 
  where id = $1
  `;

  try {
    await pool.query(query, [recordID]);
    console.log("record soft deleted sucsesfully");
  } catch (err) {
    console.error("err deleting record", err);
  }
};

const getBackDeletedRecord = async (tablename, recordID) => {
  const query = `
  update ${tablename}
  set is_deleted = false 
  where id = $1
  `;

  try {
    await pool.query(query, [recordID]);
    console.log("get record back successfuly");
  } catch (err) {
    console.error("err geting back record", err);
  }
};

const hardDeletedRecord = async (tablename, recordID) => {
  const query = `
  delete from ${tablename} 
  where id = $1
  `;

  try {
    await pool.query(query, [recordID]);
    console.log("get record back successfuly");
  } catch (err) {
    console.error("err geting back record", err);
  }
};

app.get("/non", async (req, res) => {
  const query = `
  SELECT *
  FROM usersinfo
  WHERE is_deleted = false;
`;

  try {
    const result = await pool.query(query);
    const records = result.rows;
    console.log("Non-deleted records:", records);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving non-deleted records", error);
  }
});

app.get("/deleted", async (req, res) => {
  const query = `
  SELECT *
  FROM usersinfo
  WHERE is_deleted = true;
`;

  try {
    const result = await pool.query(query);
    const records = result.rows;
    console.log("Non-deleted records:", records);
    res.json(records);
  } catch (error) {
    console.error("Error retrieving non-deleted records", error);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

// softDeleteRecord("usersinfo", 1)
// getBackDeletedRecord("usersinfo", 5)
// hardDeletedRecord("usersinfo",3)
