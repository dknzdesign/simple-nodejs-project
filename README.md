# Simple Node Api Project

### BASIC NODEJS

This is a small pointless project to demonstrate the basic principles of nodejs. Using express, axios and ejs.

### RUN DEV:

To run the project use the following commands:

```bash
 cd nodejs-pagination-app
 node server.js

```

### Create from scratch:

The following is how to go about creating this project from scratch:

1. Setup Your Node.js Project
   First, create a new directory for your project, navigate into it, and initialize a new Node.js project:  
   (This creates a package.json file in your project root.)

```bash

    mkdir nodejs-pagination-app
    cd nodejs-pagination-app
    npm init -y
```

2. Install Required Packages
   Install the necessary packages, including express, axios, and ejs (for templating):

```bash
    npm install express axios ejs
```

3. Create the Basic File Structure
   Create the following files and directories:

- server.js: The main server file.
- views/: A directory for your EJS templates.
- views/index.ejs: The main view file.
- public/: A directory for any static assets (optional, but good practice).

4. Create the Express Server (server.js)

```javascript
const express = require("express");
const axios = require("axios");
const app = express();

// Use EJS as the templating engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

// API endpoint to fetch data from
const API_URL = "https://rickandmortyapi.com/api/character";

// Route for the main page
app.get("/", async (req, res) => {
  // Get the current page from the query, default to 1
  const page = parseInt(req.query.page) || 1;

  try {
    // Fetch data from the API
    const response = await axios.get(`${API_URL}?page=${page}`);
    const characters = response.data.results;
    const totalPages = response.data.info.pages;

    // Render the data in the index.ejs template
    res.render("index", {
      characters: characters,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).send("Error fetching data from API");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

5. Create the EJS Template (views/index.ejs)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Character List</title>
    <link rel="stylesheet" href="/styles.css" />
    <!-- Add your styles if needed -->
  </head>
  <body>
    <h1>Character List</h1>

    <div class="card-container">
      <% characters.forEach(character => { %>
      <div class="card">
        <img src="<%= character.image %>" alt="<%= character.name %>" />
        <h2><%= character.name %></h2>
        <p>Status: <%= character.status %></p>
        <p>Species: <%= character.species %></p>
        <p>Gender: <%= character.gender %></p>
      </div>
      <% }) %>
    </div>

    <div class="pagination">
      <% if (currentPage > 1) { %>
      <a href="/?page=<%= currentPage - 1 %>">Previous</a>
      <% } %> <% if (currentPage < totalPages) { %>
      <a href="/?page=<%= currentPage + 1 %>">Next</a>
      <% } %>
    </div>
  </body>
</html>
```

6. Add Some Basic CSS (Optional, public/styles.css)
   Create a styles.css file in the public directory for basic styling:

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f4;
}

h1 {
  text-align: center;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  width: 200px;
}

.card img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination a {
  margin: 0 10px;
  text-decoration: none;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}
```

7. Run the Application
   Now you can run the application:

```bash

node server.js

```

Open your browser and navigate to http://localhost:3000. You should see a list of characters displayed in cards with pagination controls to navigate between pages.

Summary
Express.js serves as the web framework for handling routes.
Axios is used to fetch data from the "Rick and Morty" API.
EJS is used to render dynamic HTML content.
Pagination is implemented by passing the current page number in the query string and using it to fetch the appropriate data from the API.
