// Importing necessary libraries
const express = require('express');
const app = express();
const { json } = require('body-parser');
const brain = require('brain.js');

// Sample dataset for testing
const dataset = [
  { x: 1, y: 2, label: 'A' },
  { x: 2, y: 3, label: 'A' },
  { x: 3, y: 4, label: 'A' },
  { x: 1, y: 4, label: 'B' },
  { x: 2, y: 5, label: 'B' },
  { x: 3, y: 6, label: 'B' },
];

// Create an artificial neural network
const net = new brain.NeuralNetwork();
net.train(dataset, {
  iterations: 1000,
  errorThresh: 0.005
});

// Create an express route for data visualization
app.post('/visualize', json(), (req, res) => {
  const { data } = req.body;
  const results = data.map((item) => {
    const output = net.run(item);
    return { x: item.x, y: item.y, label: output.label };
  });
  res.json(results);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Test the API
const testData = [
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 1, y: 6 },
];
app.post('/visualize', json(), (req, res) => {
  res.json(testData);
})(testData);