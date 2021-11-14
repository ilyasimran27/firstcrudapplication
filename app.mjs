import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
// mongoose.connect(
//   "mongodb+srv://dbUser:dbUserPassword@cluster0.snbyo.mongodb.net/myCrudApp?retryWrites=true&w=majority"
// );
mongoose.connect(
  "mongodb+srv://dbUser:dbUserPassword@cluster0.snbyo.mongodb.net/myCrudApp?retryWrites=true&w=majority"
,function(){
console.log('db connected please move forward')
});
const User = mongoose.model("users", {
  name: String,
  email: String,
  pass: String,
});
const app = express();
const port = process.env.PORT || 3000;

let users = [];
app.use(cors());
app.use(express.json());
app.use(morgan('short'))
app.use((req, res, next) => {
  console.log("a request came", req.body);
  next()
})

app.get('/users', (req, res) => {

  User.find({}, (err, users) => {
    if (!err) {
      console.log('users')
      res.send(users)
    } else {
      res.status(500).send("error happened")
    }
  })


})
//previos functions
// app.get("/users", (req, res) => {
//   res.send(users);
// });

//previos function
// app.get("/users/:id", (req, res) => {
//   if (users[req.params.id]) {
//     res.send(users[req.params.id]);
//   } else {
//     res.send("user not found");
//   }
// });

//for particular user
app.get('/users/:id', (req, res) => {
console.log('id in particular user==>',req.params.id)
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (!err) {
      res.send(user)
    } else {
      res.status(500).send("error happened")
    }
  })

})
app.post('/users', (req, res) => {

  if (!req.body.name || !req.body.email || !req.body.pass) {
    console.log('this is req=>',req.body)
    res.status(400).send("invalid data");
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      pass: req.body.pass
    });
    newUser.save().then(() => {
      console.log('user created success')
      res.send("users created");
    });
  }
})
//previos method
// app.post("/users", (req, res) => {
//   if (!req.body.name || !req.body.email || !req.body.pass) {
//     res.status(400).send("invalid data");
//   } else {
//     users.push({
//       name: req.body.name,
//       email: req.body.email,
//       pass: req.body.pass,
//     });
//   }
//   res.send("user created");
// });

app.put('/users/:id', (req, res) => {
  let updateObj = {}
console.log('request===?',req.body)
  if (req.body.name) {
    updateObj.name = req.body.name
  }
  if (req.body.email) {
    updateObj.email = req.body.email
  }
  if (req.body.pass) {
    updateObj.pass = req.body.pass
  }
  // if(req.body.fathername){
  //   updateObj.fathername = req.body.fathername
  // }
 

  User.findByIdAndUpdate(req.params.id, updateObj, { new: true },
    (err, data) => {
      if (!err) {
        res.send(data)
      } else {
        res.status(500).send("error happened")
      }
    })
})


//previos updated function
// app.put("/users/:id", (req, res) => {
//   if (users[req.params.id]) {
//     if (req.body.name) {
//       users[req.params.id].name = req.body.name;
//     }
//     if (req.body.email) {
//       users[req.params.id].email = req.body.email;
//     }
//     if (req.body.pass) {
//       users[req.params.id].pass = req.body.pass;
//     }

//     res.send(users);
//   } else {
//     res.send("user not found");
//   }
  
// });
app.delete('/users/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send("user deleted")
    } else {
      res.status(500).send("error happened")
    }
  })
})

// previos delete function
// app.delete("/users/:id", (req, res) => {
//   if (users[req.params.id]) {
//     users[req.params.id] = {};
//     res.send("user deleted");
//   } else {
//     res.send("user not found");
//   }
// });

app.get("/about", (req, res) => {
  res.send("Kamran here how can i do for you!!");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
