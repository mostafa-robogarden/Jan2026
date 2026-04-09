const http = require("http");
const express = require('express');
const { use } = require("react");
const cors = require('cors');
const app = express();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(express.json());
app.use(cors({ origin: '*' }));
const data = [{id:1, name:'John Doe', age:30}, {id:2, name:'Jane Doe', age:25}, {id:3, name:'Bob Smith', age:40}];
//CRUD - Create, Read, Update, Delete
app.get('/', (req, res) => {
    res.send('ready');
});
app.get('/users', (req, res) => {
    res.json(data);
});
app.get('/users/:id', (req, res) => {
    const user = data.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});
app.post('/users', (req, res) => {
    console.log(req.name);
    console.log(req.body);
    const { name, age } = req.body;
    const newUser = { id: data.length + 1, name, age };
    data.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    const user = data.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    const { name, age } = req.body;
    user.name = name || user.name;
    user.age = age || user.age;
    res.json(user);
});
app.delete('/users/:id', (req, res) => {
    const userIndex = data.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');
    const deletedUser = data.splice(userIndex, 1);
    res.json(deletedUser[0]);
});
app.listen(3000, () => {
    //127.0.0.1 or localhost
  console.log("Server is running at http://localhost:3000");
});
