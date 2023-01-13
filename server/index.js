const express = require("express");
const app = express();
const mysql = require("mysql2");
const PORT = 3001;
const cors = require("cors");
const { encrypt, decrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

// Enter your database Configuration
const db = mysql.createConnection({
  user: "",
  host: "",
  password: "",
  database: "",
});

db.connect();

app.get("/", (req, res) => {
  res.send("working");
});

app.get("/showPasswords", (req, res) => {
  db.query("SELECT * FROM passwords", (error, result) => {
    if (error) console.log(error);
    else res.send(result);
  });
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (error, result) => {
      if (error) console.log(error);
      else res.send("Success");
    }
  );
});

app.post("/decryptpassword", (req, res) => {
  console.log("/decryptpassword working");
  res.send(decrypt(req.body))
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
