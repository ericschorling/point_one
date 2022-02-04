const express = require('express')
const cors = require('cors')
const survey = require('./survey')
const position = require('./position')

const app = express();

const bodyparser = require('body-parser')

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
//app.use(express.static('build'))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static('build')); // serve static files (css & js) from the 'public' directory
app.get('/', (req, res) =>{
    res.send("<h1>Hello World</h1>")
})
app.get('/location', (req,res)=>{
    //sent location data
    res.send(position)
})

app.get('/survey', (req,res)=> {
    //send survey results
    res.send(survey)
})

app.listen(PORT, () => { // start server and listen on specified port
    console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
});