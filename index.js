import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

let storedData = [];

app.post("/submit", (req, res) => {
  let titleValue = req.body.fTitle;
  let descValue = req.body.fDescription;

  let userData = req.body;

  storedData.push({
    title: userData.fTitle,
    description: userData.fDescription,
  });

  res.render("index.ejs", {
    title: titleValue,
    description: descValue,
    data: storedData,
  });
});

app.delete("/");

app.get("/", (req, res) => {
  res.render("index.ejs", {
    data: storedData,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
