/* eslint-env node */
"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");

const staticFileLocation = path.join(__dirname, "..");
const port = process.env.PORT || 9000;
const app = express();

app.use(cors({ origin: "*" }));

app.use(express.static(staticFileLocation));

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});