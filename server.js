// File server.js
const mysql = require("mysql2");
const config = require("./config");
const express = require("express");
const cors = require("cors");
const app = express();
const port = config.express.port;
const con = mysql.createConnection({
  host: config.mysql.host,
  port: config.mysql.port,
  database: config.mysql.database,
  user: config.mysql.user,
  password: config.mysql.password,
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World! Let's Working with MySQL Databases");
});

const connectDB = async () => {
  try {
    await con.connect(function (err) {
      if (err) {
        console.log("database connection error!, ", err);
      } else {
        console.log("database connection successfully!");
      }
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();

// Read Patients All API
app.get("/patients", async (req, res) => {
  await new Promise((resolve, rejects) => {
    var readSQL = "SELECT * FROM patients;";
    con.query(readSQL, (err, results) => {
      if (err) {
        console.log("database connection error!, ", err);
      } else {
        res.status(200).send(results);
      }
    });
  });
});

app.get("/rights", async (req, res) => {
  await new Promise((resolve, rejects) => {
    var readSQL = "SELECT * FROM rights;";
    con.query(readSQL, (err, results) => {
      if (err) {
        console.log("database connection error!, ", err);
      } else {
        res.status(200).send(results);
      }
    });
  });
});

// Patients Create API
app.post('/patients/create/', async (req, res) => {
	const params = req.body;

	console.log("create:", params);
	
	var insertSQL = "INSERT INTO patients (HN, Name, Patient_Rights_1, Patient_Rights_2, Patient_Rights_3, Chronic_Disease, Address, Phone) VALUES ('" + params.HN + "', '" + params.Name + "', '" + params.Patient_Rights_1 + "', '" + params.Patient_Rights_2 + "', '" + params.Patient_Rights_3 + "', '" + params.Chronic_Disease + "', '" + params.Address + "', '" + params.Phone + "');";
	var readSQL = "SELECT * FROM patients";

	await new Promise((resolve, rejects) => {
		try {
			con.query(insertSQL, function (err) {
				if (err) {
					console.log('database connection error!, ', err);
				} else {
					con.query(readSQL, (err, results) => {
						if (err) {
							console.log('database connection error!, ', err);
						} else {
							res.status(200).send(results);
						}
					});
				}
			});
		} catch (err) {
			console.log(err);
			res.status(404).send("backend error!");
		}
	});
});


// Patients Update API
// Patients Update API
app.put('/patients/update/', async (req, res) => {
	const params = req.body;
	console.log("update:", params);
	var updateSQL = "UPDATE patients SET Name = '" + params.Name + "', Patient_Rights_1 = '" + params.Patient_Rights_1 + "', Patient_Rights_2 = '" + params.Patient_Rights_2 + "', Patient_Rights_3 = '" + params.Patient_Rights_3 + "', Chronic_Disease= '" + params.Chronic_Disease + "', Address = '" + params.Address + "', Phone ='" + params.Phone + "' WHERE (HN = '" + params.HN + "');";
	var readSQL = "SELECT * FROM patients";

	await new Promise((resolve, rejects) => {
		try {
			con.query(updateSQL, function (err) {
				if (err) {
					console.log('database connection error!, ', err);
				} else {
					con.query(readSQL, (err, results) => {
						if (err) {
							console.log('database connection error!, ', err);
						} else {
							res.status(200).send(results);
						}
					});
				}
			});
		} catch (err) {
			console.log(err);
			res.status(404).send("backend error!");
		}
	});
})

// Delete
app.delete('/patients/delete/:HN', (req, res) => {
  const { HN } = req.params;

  if (!HN) {
      return res.status(400).send({ error: 'HN is required to delete a patient' });
  }

  const sql = 'DELETE FROM patients WHERE HN = ?';

  db.query(sql, [HN], (err) => {
      if (err) {
          console.error('Failed to delete patient:', err.message);
          return res.status(500).send({ error: 'Failed to delete patient' });
      }

      // Fetch updated list of patients
      db.query('SELECT * FROM patients', (err, patients) => {
          if (err) {
              console.error('Failed to fetch updated patients:', err.message);
              return res.status(500).send({ error: 'Failed to fetch updated patients' });
          }

          res.status(200).send(patients);
      });
  });
});

// Read Patient by Name
app.post('/patients/search/:searchText', async (req, res) => {
	const { params } = req;
	const searchText = params.searchText

	var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~^\s]/;
	var test = format.test(searchText);

	var searchSQL = "SELECT * FROM patients WHERE Name LIKE '%" + searchText + "%';"

	await new Promise((resolve, rejects) => {
		if (test) {
			res.status(200).send();
		} else {
			try {
				con.query(searchSQL, function (err, results) {
					if (err) {
						console.log('database connection error!, ', err);
						res.status(404).send("backend error!");
					} else {
						res.status(200).send(results);
					}
				});
			} catch (err) {
				console.log(err);
				res.status(404).send("backend error!");
			}
		}
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// end of patinets