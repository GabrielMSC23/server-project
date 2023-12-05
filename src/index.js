const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const User = require('./models/user')
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const port = 8090;




app.post('/register', async (req, res) => {
  const {name, email, password} = req.body

  const user = {
    name,
    email,
    password,
  }
  await User.create(user)

  res.status(200).json({success: true})
})



app.get('/login', async (req, res) => {
  try{
    await User.find({
      name: req.name,
      password: req.password,
    })
    res.status(200).json({ success: true });
  }catch(error){
    res.status(404).json({success: false})
  }
  
 

  
})





app.listen(port, () => {
  mongoose.connect('mongodb+srv://gabrielfeiceiro:hwtCnmRc4ykRIRup@project-react.p3ptipp.mongodb.net/?retryWrites=true&w=majority');
  console.log('Server rodando na porta 8090')
})