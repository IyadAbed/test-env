const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'std',
  password: 'admin',
  port: 5432, // Default PostgreSQL port is 5432
});

app.use(express.json());

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const softDeleteQuery = 'UPDATE usersinfo SET deleted = true WHERE id = $1 RETURNING *';

  pool.query(softDeleteQuery, [userId], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error executing query');
    } else if (result.rows.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.json(result.rows[0]);
    }
  });
});


app.listen(50000, () => {
  console.log('Listening on port 5000');
});