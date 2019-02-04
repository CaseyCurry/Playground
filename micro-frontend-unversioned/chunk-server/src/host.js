const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const staticFileLocation = path.join(__dirname, "domain-apps");

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:8091"
  })
);

app.use(express.static(staticFileLocation));

app.get("/", (request, response) => {
  response.send(`${staticFileLocation}`);
});

const port = process.env.PORT || 8090;

app.listen(port, () => {
  console.log(`ready at port ${port}, captain...`);
});
