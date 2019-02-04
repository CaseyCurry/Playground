const path = require("path");
const express = require("express");
const helmet = require("helmet");

const staticFileLocation = path.join(__dirname);

const app = express();
app.use(helmet());

app.use(express.static(staticFileLocation));

app.get("/", (request, response) => {
  response.send(`${staticFileLocation}`);
});

const port = process.env.PORT || 8091;

app.listen(port, () => {
  console.log(`ready at port ${port}, captain...`);
});
