/* eslint-env node */
"use strict";

const express = require("express");
const helmet = require("helmet");
const path = require("path");

const staticFileLocation = path.join(__dirname, "app");
const home = "index.html";
const port = 8080;
const app = express();

app.use(helmet());

app.use(express.static(staticFileLocation));

app.get("/", (request, response) => {
  response.send(`${staticFileLocation}/${home}`);
  response.end();
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
