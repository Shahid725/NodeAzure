const axios = require("axios");
const spauth = require("node-sp-auth");
const express = require("express");
const app = express();

require("dotenv").config();

// const siteUrl =
//   "https://resembleae-my.sharepoint.com/personal/ratheesh_resemblesystems_com";
// const listTitle = "ratheeshList";

const siteUrl =
  "https://resembleae.sharepoint.com/sites/powerbi/trainingfeb/shahid";
const listTitle = "AzureConnect";

const password = process.env.APP_PASSWORD;
const username = process.env.APP_USERNAME;

spauth
  .getAuth(siteUrl, {
    username: username,
    password: password,
  })
  .then((authOptions) => {
    const headers = authOptions.headers;
    const requestUrl = `${siteUrl}/_api/web/lists/getByTitle('${listTitle}')/items`;

    axios
      .get(requestUrl, { headers })
      .then((response) => {
        console.log("SharePoint list data:", response.data);
        const allData = response.data;
        app.get("/", (req, res) => {
          res.json(allData);
        });
        app.get("/title", (req, res) => {
          res.json(allData.value.filter((dd) => dd.Status == "Approved"));
        });
      })
      .catch((error) => {
        console.error("Error fetching SharePoint list data:", error);
      });
  })
  .catch((error) => {
    console.error("Error authenticating with SharePoint:", error);
  });

spauth
  .getAuth(siteUrl, {
    username: username,
    password: password,
  })
  .then((authOptions) => {
    const headers = authOptions.headers;
    const requestUrl = `${siteUrl}/_api/web/lists/getByTitle('${listTitle}')/items(3)/AttachmentFiles`;

    axios
      .get(requestUrl, { headers })
      .then((response) => {
        console.log("SharePoint list data:", response.data);
        const allData2 = response.data;
        app.get("/attachments", (req, res) => {
          res.json(allData2);
        });
      })
      .catch((error) => {
        console.error("Error fetching SharePoint list data:", error);
      });
  })
  .catch((error) => {
    console.error("Error authenticating with SharePoint:", error);
  });

// function allData(data) {
//   console.log(data);
// }

// app.get("/", (req, res) => {
//   res.json(allData);
// });

const port = 8000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
