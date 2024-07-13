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
    id: storedData.length,
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

// Renders the content of updateFields file
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

// Returns a JSON response. Wrote it here since I can't write it in the the /renderEditPage, I can only call res. once here
app.get("/getEditPage/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < storedData.length) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.post("/submitEdit/", (req, res) => {
  let titleValue = req.body.fTitle;
  let descValue = req.body.fDescription;
  let idValue = +req.body.fID; // Using + in front of req.body to convert it to a number type
  // console.log(typeof idValue);

  // console.log(titleValue);
  // console.log(descValue);
  // console.log(idValue);

  let newObject = {
    title: titleValue,
    description: descValue,
    id: idValue,
  };

  // Using findIndex to see what the index of the current element with its' specific ID is
  let index = storedData.findIndex(function (blog) {
    // console.log(blog);
    console.log("idValue: ", req.params.idValue);
    return blog.id == idValue;
  });

  // console.log(storedData);
  // console.log(index);
  // console.log(idValue);

  // console.log(storedData);
  // console.log(typeof storedData[2].id);

  storedData.splice(index, 1, newObject); // Here I delete the blog with the specific index and I assign the new values using the newObject

  // console.log(storedData);
  // console.log(typeof storedData[2].id);

  res.render("index.ejs", {
    data: storedData,
  });
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    data: storedData,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
