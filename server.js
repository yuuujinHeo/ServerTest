const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const port = 11334;

//DB(mySQL)
const testdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rainbow',
    database: 'testdb'
});

testdb.connect((err) => {
    if(err){
        console.error("DB connect error : ",err);
        throw err;
    }
    console.log("DB connected");
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/"));



app.listen(port, function(){
    console.log('listening on '+port);
});


app.get('/db', (req,res) =>{
    console.log("GET");
    testdb.query('SELECT * FROM robots', (err, result) => {
        if(err){
            console.error("DB select error : ",err);
            res.status(500).send('DB error');
        }else{
            res.send(result);
        }
    });
});

app.post('/setstatus',(req,res) =>{
    console.log("SET STATUS");
    const {robot_id, wifi_ip, battery, exec_time, map_name, state_ui,
        state_charge, state_localization, state_running, state_motorlock, state_emo} = req.body;
    const sql = `INSERT INTO robots (robot_id, wifi_ip, battery, exec_time, map_name, state_ui,
        state_charge, state_localization, state_running, state_motorlock, state_emo) VALUES ('${robot_id}', '${wifi_ip}', '${battery}'
        , '${exec_time}', '${map_name}', '${state_ui}', '${state_charge}', '${state_localization}', '${state_running}' 
        , '${state_motorlock}', '${state_emo}') ON DUPLICATE KEY UPDATE robot_id='${robot_id}', wifi_ip='${wifi_ip}',
        battery='${battery}',exec_time='${exec_time}',map_name='${map_name}',state_ui='${state_ui}',state_charge='${state_charge}',
        state_localization='${state_localization}',state_running='${state_running}',state_motorlock='${state_motorlock}',state_emo='${state_emo}'`;
    testdb.query(sql, (err,result) => {
        if(err){
            console.error("INSERT error : ",err);
            res.status(500).send('INSER error');
        }else{
            res.status(201).send('INSERT success');
        }
    });
});


app.get('/',function(req,res){
    // 데이터를 준비합니다.
    const data = {
        name: 'John',
        age: 30
    };
    // EJS 템플릿을 렌더링하여 HTML을 생성합니다.
    res.render('index.ejs', { data });
});

app.get('/view',function(req,res){
    testdb.query('SELECT * FROM robots', (err, result) => {
        if(err){
            console.error("DB select error : ",err);
            res.status(500).send('DB error');
        }else{
            // res.send(result);
            // EJS 템플릿을 렌더링하여 HTML을 생성합니다.
            res.render('view.ejs', { rows: result });
        }
    });
});
