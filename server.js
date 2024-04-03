const express = require('express');
const app = express();

app.listen(8888, function(){
    console.log('listening on 8888');
});


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/tools',function(req,res){
    res.sendFile(__dirname + '/tools.html');
});
app.get('/setting',function(req,res){
    res.sendFile(__dirname + '/setting.html');
});