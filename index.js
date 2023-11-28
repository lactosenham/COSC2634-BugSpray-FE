const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "auth-layout");
app.use(express.urlencoded({ extended: true }));

// to apply css styles
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
/* Route template 

app.get('<- insert route name here ->', (req, res) => {
    res.render('layout.ejs/auth-layout.ejs', {
        title: '<- insert title here ->',
        bodyFile: '<- insert body file here ->', 
    });

*/
app.get('/login', (req, res) => {
    res.render('authLayout.ejs', {
        title: 'Home',
        bodyFile: './auth/login',
    });
});

app.get('/register', (req, res) => {
    res.render('authLayout.ejs', {
        title: 'Home',
        bodyFile: './auth/register',
    });
});
app.get('/project-create', (req, res) => {
    res.render('layout.ejs', {
        title: 'Create New Project',
        bodyFile: './project/create',
    });
}
);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
