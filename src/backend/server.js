import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

const data_file = __dirname + "/data/db.json";

app.use(cors());
app.use(bodyParser.json());

function readFile() {
  const data = fs.readFileSync(data_file, "utf-8");
  return JSON.parse(data);
}

function writeFile(file) {
  fs.writeFileSync(data_file, JSON.stringify(file, null, 2));
}

app.get("/todos", (req, res) => {
  const todos = readFile();
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todos = readFile();
  const newTodos = req.body;
  todos.push(newTodos);
  writeFile(todos);
  res.status(201).json(newTodos);
});

app.listen(PORT, () => {
  console.log(`Server running at https://localhost:${PORT}`);
  console.log(data_file);
});
