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

app.get('/project/:id',(req, res, next)=>{
    if (data.projects[req.params.id]){
        res.render('project', {data: data.projects[req.params.id]})
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "Oops, no project with that ID";
        next(err);
    }
})

app.use((req,res,next)=>{
    console.log("404 error!");
    res.status(404).render('error');
})

app.use((err, req, res, next)=>{
    if (err){
        console.log("Global error handler called", err);
    }
    if (err.status===404){
        res.status(404).render('error', {err});
    } else {
        err.message = err.message || "Oops. Something went wrong on the server!";
        res.status(err.status || 500).render('error', {err});
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})