const express = require("express");
require("dotenv").config({ debug: true });
const path = require("path");

const app = express();
const port = process.env.PORT;

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
