const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const User = require('./models/user.model');
const emailTemplateString = require('./assets/email/template')
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mongoose.connect(process.env.DB_HOST, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => {
  console.log("Connected to database!");
})

exports.signUp = async (email, username, password, name) => {
  let userData = {}
  //console.log(email);
  userData.email = email.trim()
  userData.password = password.trim()
  userData.name = name.trim()
  userData.username = username.trim()
  if(!userData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return { error: true, message: "Email invalid format" }
  if(!userData.username.match(/^[a-zA-Z0-9]+$/)) return {error: true, message: "Username invalid format"}
  if(!userData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) return { error: true, message: "Week password"}
  if(!userData.name.match(/^([\w]{3,})+\s+([\w\s]{3,})+$/i)) return { error: true, message: "Name invalid format"}
  let records = await User.find({email: userData.email})
  //console.log(records);
  if(records.length !== 0) return { error: true, message: "Account already exists" }
  records = await User.find({username: userData.username})
  if(records.length !== 0) return { error: true, message: "Username already taken" }
  //console.log(userData);
  let userObj = new User(userData), result = await userObj.save(), semail = emailTemplateString.emailTemplateString.replace(/{{{vid}}}/g, result['_id'])
  //console.log(emailTemplateString.emailTemplateString);
  const msg = { to: result.email, from: 'support@localhost.com', subject: 'Please verify your email', html: semail };
  //console.log(msg);
  try { await sgMail.send(msg) } catch (error) { if (error.response) { console.error(error.response.body) } }
  //console.log(result);
  return { error: false, status: "success"}
}
exports.signIn = async (username, password) => {
  let userData = {}
  userData.username = username.trim()
  userData.password = password.trim()
  if(userData.username == "" || userData.password == "") {
    return {error: true, message: "Invalid object format"}
  }
  //console.log(userData);
  let records = await User.findOne({ username: userData.username, password: userData.password })
  //console.log(records);
  if(records == null){
    //console.log(records);
    return { error: true, message: "Invalid Credentials" }
  } else {
    if(!records.isVerified) return {error: true, message: "Verify your email first lo login."}
    else {
      let token = jwt.sign({ username: userData.username }, process.env.JWT_SECRET);
      return {error: false, token}
    }
  }
}
exports.verify = async (id) => {
  try {
    await User.updateOne({'_id': id}, {isVerified: true})
  } catch (e) {
    return {error: true, message: e.message}
  }
  return {error: false, message: "success"}
}
/*
let token = jwt.sign({ username: userData.username }, process.env.JWT_SECRET);
return {error: false, token}
*/
exports.verifyJwt = async (token) => {
  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
    return {error: false, username: decoded.username}
  } catch (e) {
    //console.log(e.message);
    return {error: true, status: e.message}
  }
}
