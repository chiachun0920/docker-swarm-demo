'use strict';

const express = require('express');
const redis = require('redis');
const os = require('os');

let client = redis.createClient('redis://redis');
let isRedisConnected = false;
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

const page = () => {
  return `
    <div>Hello world!</div>
    <div>hostname: ${os.hostname()}</div>
    <div>redis is connected: ${isRedisConnected}</div>
  `;
}

app.get('/', (req, res) => {
  res.send(page());
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

client.on('error', error => {
  console.log(error);
});

client.on('ready', () => {
  console.log('connection ready');
  isRedisConnected = true;
});

client.on('connect', () => {
  console.log('connection connected');
});
