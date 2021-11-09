import express from "express";
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;

let users = [];
app.use(cors());
app.use(express.json())
app.get("/users",(req,res)=>{
    res.send(users)
});
app.get("/users/:id",(req,res)=>{

    
  if (users[req.params.id]) {
    res.send(users[req.params.id])
  } else {
    res.send("user not found");
  }
  
});


app.post("/users",(req,res)=>{
    if(!req.body.name ||  !req.body.email || !req.body.pass)
    {
        res.status(400).send("invalid data");
    }
    else{
       users.push({
        name :req.body.name,
        email :req.body.email,
        pass :req.body.pass
       })
    }
    res.send("user created")
});
app.put("/users/:id",(req,res)=>{

    if (users[req.params.id]) {

        if (req.body.name) {
          users[req.params.id].name = req.body.name
        }
        if (req.body.email) {
          users[req.params.id].email = req.body.email
        }
        if (req.body.pass) {
          users[req.params.id].pass = req.body.pass
        }
    
        res.send(users)
    
      } else {
        res.send("user not found");
      }
// jdvjnjnvnjnjn



});
app.delete("/users/:id",(req,res)=>{
    if(users[req.params.id]){
      users[req.params.id] = {};
    res.send("user deleted");

  } else {
    res.send("user not found");
  }
    });










app.get("/about",(req,res)=>{
    res.send("Kamran here how can i do for you!!")
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});