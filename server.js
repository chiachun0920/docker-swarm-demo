'use strict';

const express = require('express');
const redis = require('redis');
const os = require('os');

let client = redis.createClient('redis://redis');
let isRedisConnected = false;
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    res.send(`Hello world\nhostname: ${os.hostname()}\nredis is connected: ${isRedisConnected}\n`);
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
