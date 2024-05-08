import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/submit", (req, res, next) => {
  let titleValue = req.body.fTitle;
  let descValue = req.body.fDescription;

  let storedData = [];
  let userData = req.body;

  storedData.push(userData);

  res.send("Data stored successfully!");
  next();

  res.render("index.ejs", {
    title: titleValue,
    description: descValue,
  });
});

app.get("/", (req, res) => {
  // res.json(storedData);
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
