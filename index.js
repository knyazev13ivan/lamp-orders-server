import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect('mongodb+srv://admin:lampadmin@cluster0.a1mukxo.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database ERROR', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Test Hello! 2ddd');
});

app.post('/auth/login', (req, res) => {

  const token = jwt.sign({
    login: req.body.login,
    fullName: 'Test Name'
  }, 'supersecret');

  res.json({
    success: true,
  });
});

app.listen(3001, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server ok');
});