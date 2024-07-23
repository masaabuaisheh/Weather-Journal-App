const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');


const app = express();
const port = 8000;
const server = app.listen(port,listening);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));


/* Empty JS object to act as endpoint for all routes */
projectData = {};

// GET route
app.get('/all', callBack);

function callBack (req, res) {
  res.send(projectData);
};


// POST route
app.post('/add', callBackinf);

function callBackinf(req,res){
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feelings: req.body.feelings
      };
      res.send(projectData);
}

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

