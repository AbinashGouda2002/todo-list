const express = require('express');
// third party middleware
const morgan = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');

const Task = require('./Models/tasks');
require("./Db/Db")

//express app

const app = express();

//connect to mongoDB


//register view engine
app.set('view engine', 'ejs');

//listen for request
app.listen(process.env.PORT || 5000,()=>{
  console.log(`Server is running on port ${process.env.PORT} `);
});

//middleware static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
// third party middleware
app.use(morgan('dev'));

//home page
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//task routes
app.get('/tasks', (req, res) => {
  Task.find().sort({createdAt: -1})
    .then((result) => {
      res.render('index', {title:'All Tasks', tasks: result})
    })
    .catch((err) => {
      console.log(err);
    });
})

//posting datas into database
app.post('/create', (req, res) => {
    const task = new Task(req.body);
    task.save()
      .then(result => res.redirect('/tasks'))
      .catch(err => console.log(err));
})

//details page
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;  
    Task.findById(id)
       .then(result => {
          res.render('details', {task: result, title: 'Task Details'});
       })
       .catch(err => {
        console.log(err);
       })
})

//delete id
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/tasks'})
    })
    .catch(err => {
      console.log(err);
    })
})

//create page
app.get('/create', (req, res) => {
    res.render('create', {title: 'Create a new task'});
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404 - Not Found'});
});