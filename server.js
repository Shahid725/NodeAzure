const express = require("express");
const app = express();
const data = [
  { projectname: "Qapco", Status: "done" },
  { projectname: "IsDB", Status: "inprogress" },
  { projectname: "ARC", Status: "inprogress" },
];

app.get("/", (req, res) => {
  //   const data = [
  //     { projectname: "Qapco", Status: "done" },
  //     { projectname: "IsDB", Status: "inprogress" },
  //     { projectname: "ARC", Status: "inprogress" },
  //   ];

  res.json(data);
});
app.get("/isdb", (req, res) => {
  res.json(data[1].projectname);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
