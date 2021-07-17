const express = require('express')
const app = express()
const port = 3000
const data = require('./data.json');

app.set('view engine', 'pug')
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {data: data.projects})
})

app.get('/about',(req, res)=>{
    res.render('about');
})

app.get('/project/:id',(req, res)=>{
    res.render('project', {data: data.projects[req.params.id]})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})