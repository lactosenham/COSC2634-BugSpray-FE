const express = require("express");
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const path = require("path");
const port =  process.env.PORT || 3001;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "auth-layout");
app.use(express.urlencoded({ extended: true }));

// To apply css styles
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Proxy configuration
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://sheltered-fjord-56184-5e2592813541.herokuapp.com/", // Backend server address
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Rewrites '/api' to '' when forwarding the request
    },
  })
);

// Routes
/* Route template 

app.get('<- insert route name here ->', (req, res) => {
    res.render('layout.ejs/auth-layout.ejs', {
        title: '<- insert title here ->',
        bodyFile: '<- insert body file here ->', 
    });

*/


// Home
app.get("/", (req, res) => {
  res.render("layout.ejs", {
    title: "Home",
    bodyFile: "./summary",
    activePage: "summary",
    scripts: [
      '/scripts/summary/chart.js',
      '/scripts/summary/recentlySolvedBugs.js',
      '/scripts/summary/bugsNum.js'
    ]
  });
});

// Log in
app.get('/login', (req, res) => {
  res.render('authLayout', {
    title: 'Login',
    bodyFile: './auth/login',
    scripts: [
      '/scripts/auth/loginScript.js',
    ],
  });
});

//Register
app.get('/register', (req, res) => {
  res.render('authLayout', {
    title: 'Register',
    bodyFile: './auth/register',
    scripts: [
      '/scripts/auth/registerScript.js'
    ],
  });
});

// User Profile
app.get('/profile', (req, res) => {
  res.render('layout', {
    title: 'Profile',
    bodyFile: './user/profile',
    activePage: "profile",
    scripts: [
      '/scripts/user/profile.js',
      '/scripts/auth/logoutScript.js'
    ],
  });
}
);

// About
app.get("/about", (req, res) => {
  res.render("layout", {
    title: "About Us",
    bodyFile: "./others/about",
    activePage: "about",
    scripts: null,
  });
});

// Copyright
app.get("/copyright", (req, res) => {
  res.render("layout", {
    title: "Copyright",
    activePage: "copy",
    bodyFile: "./others/copyright",
    scripts: null,
  });
});
// Privacy
app.get("/privacy", (req, res) => {
  res.render("layout", {
    title: "Privacy Policy",
    activePage: "privacy",
    bodyFile: "./others/privacy",
    scripts: null,
  });
});

// Terms
app.get("/terms", (req, res) => {
  res.render("layout", {
    title: "Terms & Conditions",
    activePage: "terms",
    bodyFile: "./others/terms",
    scripts: null,
  });
});

// Project Dashboard
app.get('/projects', (req, res) => {
  res.render('layout', {
    title: 'Project Dashboard',
    bodyFile: './project/projectDashboard',
    activePage: "projects",
    scripts: [
      '/scripts/project/addProject.js',
      '/scripts/project/projectDashboard.js'
    ]
  });
});

// Project Details
app.get('/project-details/:projectId', (req, res) => {
  res.render('layout', {
    title: 'Project Details',
    bodyFile: './project/projectDetail',
    activePage: "projects",
    scripts: [
      '/scripts/project/projectDetails.js',
      '/scripts/project/addDevsToProject.js',
      '/scripts/bug/addBug.js',
      '/scripts/project/editProject.js'
    ],
  });
});

// Bugs Dashboard
app.get('/bugs', (req, res) => {
  res.render('layout', {
    title: 'Bug Dashboard',
    bodyFile: './bugs/bugDashboard',
    activePage: "bugs",
    scripts: [
      '/scripts/bug/bugDashboard.js'
    ]
  });
}
);

// Bug Details
app.get('/bug-detail/:bugId', (req, res) => {
  res.render('layout', {
    title: 'Bug Details',
    activePage: "bugs",
    bodyFile: './bugs/bugDetail',
    scripts: [
      '/scripts/bug/bugDetail.js'
    ]
  });
}
);

  

// 404 Not Found Handler
// app.use((req, res, next) => {
//   res.status(404).send("Sorry, page not found");
// });

// 500 Internal Server Error Handler
// app.use((error, req, res, next) => {
//   console.error(error.stack);
//   res.status(500).send("Something broke!");
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


