const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const cors=require('cors')
app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use(express.json())
//const dbPath = process.env.DATABASE_PATH || path.join(__dirname, 'info.db');

const dbPath= path.join(__dirname, "database.db");

let db=null;

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      app.listen(8080, () => {
        console.log("Server Running at...8080");
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
  };
  
initializeDBAndServer();


app.get('/api/areas',async(req,res)=>{
    try{
        const query=`SELECT * FROM students;`;
        const result=await db.all(query);
        res.json(result);
    }catch(e){
        res.send(e)
    }
    
})

app.get('/api/mentors',async(req,res)=>{
    try{
        const query=`SELECT * FROM mentors;`;
        const result=await db.all(query);
        res.json(result);
    }catch(e){
        res.send(e)
    }
})

app.post('/userDetails',async(res,req)=>{
    try{
        const {selectarea,time,mentor}=req.body;
        const query=`INSERT INTO booked(area,time,mentor)VALUES(?,?,?);`;
        const result=await db.run(query,[selectarea,time,mentor]);
        res.json(result);
    }catch(e){
        res.send(e)
    }
})

app.get('/usersList',async(req,res)=>{
    try{
        const query=`SELECT * FROM booked;`;
        const result=await db.all(query);
        res.json(result);
    }catch(e){
        res.send(e)
    }
})