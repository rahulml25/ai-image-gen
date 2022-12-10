const express = require("express");
require("dotenv").config({ debug: true });

const app = express();
const port = process.env.PORT;

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/openai", require("./routes/openaiRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
