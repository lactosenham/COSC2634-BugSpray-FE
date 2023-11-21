const express = require('express');
const app = express();
const path = require("path");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "auth-layout");

app.use(express.urlencoded({ extended: true }));
// to apply css styles
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// Define routes
app.get('/', (req, res) => {
    res.render('test.ejs');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
