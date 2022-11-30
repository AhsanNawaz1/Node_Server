const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");
const userModal = require("../Model/user")
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const axios = require("axios");
const cheerio = require("cheerio");





const router = express.Router();

const User = require("../Model/user");

router.post("/", async(req,res)=>{
})

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY
    );
    user.message = "Sign Up Successful, Now Login."
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY
      );
      user.token = token;


      const userResp = {
        user: {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email.toLowerCase(),
          password: user.encryptedPassword,
        },
        token: token,
        message: "Login Successful."
      }
      res.status(200).json(userResp);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.post("/update/:id", async (req, res) => {

  try {
    let id = req.params.id;
    let user = await userModal.findOneAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json(user);
  }
  catch (err) {
    console.log(err)
  }

})

router.delete("/delete/:id", async (req, res) => {

  try {
    let id = req.params.id;

    await userModal.findOneAndDelete({ _id: id });
    let resp = {
      msg: "User Deleted Successfully"
    }

    res.status(200).json(resp);
  }
  catch (err) {
    console.log(err)
  }
})

router.post("/url", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);

    const html = response.data;

    const $ = cheerio.load(html);

    const titles = [];
    const links = [];
    const text = [];
    const headings = []

    $('html').map((inx, element) => {
      const title = $(element).text()
      text.push(title)
    })


    $('a').each((_idx, el) => {
      const title = $(el).text()
      const link = $(el).attr('href')
      titles.push(title)
      links.push(link)
    });

    $('html').each((_idx, el) => {
      const title = $(el).text()
    });






    let resp = {
      links: links,
      message: "URL Linked.",
      url: url,
      body: $.html('body')
    }

    res.status(200).json(resp);
  } catch (error) {
    throw error;
  }
})



module.exports = router;
