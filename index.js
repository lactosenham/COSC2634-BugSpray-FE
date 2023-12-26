const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const path = require("path");
const port = 3001;

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
    target: "http://localhost:3000", // Backend server address
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
    scripts: [
      '/scripts/auth/authInterceptor.js',
    ]
  });
});

// Log in
app.get('/login', (req, res) => {
  res.render('authLayout', {
    title: 'Home',
    bodyFile: './auth/login',
    scripts: [
      '/scripts/auth/loginScript.js'
    ],
  });
});

//Register
app.get('/register', (req, res) => {
  res.render('authLayout', {
    title: 'Home',
    bodyFile: './auth/register',
    scripts: [
      '/scripts/auth/registerScript.js'
    ],
  });
});

// Create Project
// app.get('/project-create', (req, res) => {
//   res.render('layout', {
//     title: 'Create New Project',
//     bodyFile: './project/create',
//     scripts: [
//       '/scripts/project/addDevsToProject.js',
//       '/scripts/auth/authInterceptor.js',
//       '/scripts/bug/addBug.js',
//       '/scripts/project/addProject.js'
//     ],
//   });
// }
// );

// User Profile
app.get('/profile', (req, res) => {
  res.render('layout', {
    title: 'Profile',
    bodyFile: './user/profile',
  });
}
);

// Create Project
// app.get('/project-create', (req, res) => {
//   res.render('layout', {
//     title: 'Create New Project',
//     bodyFile: './project/create',
//   });
// });


// About
app.get("/about", (req, res) => {
  res.render("layout", {
    title: "Home",
    bodyFile: "./others/about",
    scripts: null,
  });
});

// Copyright
app.get("/copyright", (req, res) => {
  res.render("layout", {
    title: "Home",
    bodyFile: "./others/copyright",
    scripts: null,
  });
});
// Privacy
app.get("/privacy", (req, res) => {
  res.render("layout", {
    title: "Home",
    bodyFile: "./others/privacy",
    scripts: null,
  });
});

// Terms
app.get("/terms", (req, res) => {
  res.render("layout", {
    title: "Home",
    bodyFile: "./others/terms",
    scripts: null,
  });
});

// Project Dashboard
app.get('/projects', (req, res) => {
  res.render('layout', {
    title: 'Project Dashboard',
    bodyFile: './project/projectDashboard',
    scripts: [
      '/scripts/auth/authInterceptor.js',
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
    scripts: [
      '/scripts/project/projectDetails.js',
      '/scripts/project/addDevsToProject.js',
      '/scripts/auth/authInterceptor.js',
      '/scripts/bug/addBug.js'
    ],
  });
});

// Bugs Dashboard
app.get('/bugs', (req, res) => {
  res.render('layout', {
    title: 'Bug Dashboard',
    bodyFile: './bugs/bugDashboard',
    scripts: [
    ]
  });
}
);

// Bug Details
app.get('/bug-detail', (req, res) => {
  res.render('layout', {
    title: 'Bug Details',
    bodyFile: './bugs/bugDetail',
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


