const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/user");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const port = 8090;

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const olduser = await User.findOne({email});

    if(olduser) {
      return res.send({status: 400, error: "User Exists"});
    }
    await User.create({
      name,
      email,
      password,
    });
    return res.status(200).send({success: true});
    
  } catch (error) {
    res.status(404).send({status: "error"});
  }
});

app.post("/login", async (req, res) => {
  const {name, password} = req.body

  try {
    const validuser = await User.findOne({name});

   if(validuser){
    const validpass = await User.findOne({password})
    if(validpass){
      return res.send({status: 200, success: true})
    }
    return res.send({status: 400, error: "Senha incorreta"})
   }
   res.send({èrror: "Usuario incorreto"})

  } catch (error) {
    return res.send({status: 400, error: "Algo deu errado"});
  }
  
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://gabrielfeiceiro:hwtCnmRc4ykRIRup@project-react.p3ptipp.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Server rodando na porta 8090");
});
