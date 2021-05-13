const express = require("express");
const path = require('path');
const app = express();
  
app.use(express.static(path.join(__dirname, 'build')));


app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));