const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // or any port you prefer

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes for handling cart operations and orders
app.post('/api/cart', (req, res) => {
 
});

app.post('/api/order', (req, res) => {

});

// Fallback to serve the index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
