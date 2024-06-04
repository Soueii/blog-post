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

  storedData.push({
    title: titleValue,
    description: descValue,
  });

  res.render("index.ejs", {
    title: titleValue,
    description: descValue,
    data: storedData,
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); // allows me to capture dynamic values from the URL path
  if (id >= 0 && id < storedData.length) {
    storedData.splice(id, 1);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// app.put("/update/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
// });

app.get("/renderEditPage/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < storedData.length) {
    res.render("updateFields.ejs", {
      data: storedData[id],
    });
  } else {
    res.status(404).send("Page not found");
  }
});

app.get("/getEditPage/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < storedData.length) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    data: storedData,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
