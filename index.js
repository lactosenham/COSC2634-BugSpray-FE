const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const path = require("path");
const port = 3001;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "auth-layout");
app.use(express.urlencoded({ extended: true }));

// To apply css styles
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Proxy configuration 
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000', // Backend server address
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Rewrites '/api' to '' when forwarding the request
    },
}));

// Routes
/* Route template 

app.get('<- insert route name here ->', (req, res) => {
    res.render('layout.ejs/auth-layout.ejs', {
        title: '<- insert title here ->',
        bodyFile: '<- insert body file here ->', 
    });

*/
app.get('/login', (req, res) => {
    res.render('authLayout', {
        title: 'Home',
        bodyFile: './auth/login',
        scriptFile: '/scripts/loginScripts.js'
    });
});

app.get('/register', (req, res) => {
    res.render('authLayout', {
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
