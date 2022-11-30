const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");
const userModal = require("../Model/user")
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const axios = require("axios");
const cheerio = require("cheerio");
var nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const fs = require('fs');


const router = express.Router();

const Portfolio = require("../Model/Portfolio");
const Projects = require("../Model/ProjectsSchema");

router.post("/sentEmail", async (req, res) => {

  try {
    const { email, subject, description } = req.body;
    if (!(email && subject && description)) {
      res.status(400).send("All input is required");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahsannawazcp@gmail.com',
        pass: 'hqnjcgnzlvrrufpm'
      }
    });

    send();

    async function send() {
      const result = await transporter.sendMail({
        from: 'ahsannawazcp@gmail.com',
        to: email,
        subject: "Thank you for contacting",
        html: `<html>

        <body>
          <style>
            @font-face {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: normal;
              src: local('PT Sans'), local('PTSans-Regular'),
                url(https://fonts.googleapis.com/css2?family=Poppins&display=swap);
            }
          </style>
          <div style="
            margin: 0 auto;
            width: 80%;
            height: auto;
            background-color: pink;
            font-family: Poppins;
            text-align: center;
          ">
            <img style="height:200px; width: auto; margin-top: 50px;" src="https://iili.io/H2HfFWu.png">
            <h1 style="width:80%; margin: 0 auto; margin-top: 30px;">Thank you for contacting me, I will get back to you as soon as possible</h1>
            <div style="background: rgb(255, 242, 255); width:80%; margin: 0 auto; margin-top: 20px; text-align: left; padding-left: 17px; padding-top: 2px;">
              <h1 style="font-size: 17px; margin-top: 20px;">
                Here's copy of your message
              </h1>
              <div style="margin-top: 20px; ">
                <h1 style="font-size: 17px;">Subject: </h1>
                <h1 style="font-size: 17px; margin-bottom: 40px;">${subject}</h1>
              </div>
              <div style="margin-top: 5px;">
                <h1 style="font-size: 17px;">Description: </h1>
                <h1 style="font-size: 17px; padding-bottom: 40px;">${description}</h1>
              </div>
            </div>
            <div style="padding-bottom: 30px;">
              <p>Also lets connect on Linkedin as well, click here: </p>
              <a href="https://www.linkedin.com/in/ahsan-nawaz-981a5221b/" target="_blank"><img style="height: 30px; margin: 0 auto; margin-top: 10px; cursor: pointer;" src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw" alt="Ahsan Nawaz Linekdin"></a>
            </div>
          </div>
        </body>
        
        </html>`
      });
    }

    const resp = {
      status: "An email has been sent to me. I will try to get back to you as soon as possible"
    }

    res.status(201).json(resp);
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", async (req, res) => {

  try {

    let About = {
      about: "I am frontend developer with thorough understanding of React.js framework and its core principles such as components, reactivity, re-useability, state handling and the virtual DOM. Familiar with the newer specifications of EcmaScript(ES6 & ES7) with knowledge of functional programming and object-oriented programming OOP paradigms. I work with popular React.js workflows (such as Redux, React Hooks, Formik Form, React-Router-Dom) with experience with both consuming and designing RESTful APIs.",
      experience: [{
        type: "Work",
        role: "React JS Developer",
        company: "Coding Pixel",
        location: "Lahore",
        duration: "Nov 2021 - Present",
        type: "Full Time"
      },
      {
        type: "Education",
        degree: "Bachelors in Information Technology",
        university: "PUCIT",
        location: "Lahore",
        duration: "Nov 2017 - Sep 2021",
        type: "Full Time"
      }],
      linkedin: "https://www.linkedin.com/in/ahsan-nawaz-981a5221b/"
    }

    res.status(201).json(About);
  } catch (err) {
    console.log(err);
  }
});

router.post("/createProject", async (req, res) => {

  try {

    const {
      title,
      demi_Title,
      stacks,
      live,
      pointers,
      description } = req.body



    if (!(title &&
      demi_Title &&
      stacks &&
      live &&
      pointers &&
      description)) {
      return res.status(400).send("All input is required");
    }

    const posts = await Projects.create({
      title,
      demi_Title,
      stacks,
      live,
      pointers,
      description,
    });

    const resp = {
      msg: "Project is created"
    }

    return res.status(200).send(posts);
  } catch (err) {
    console.log(err);
  }
})

router.get("/getProjects", async (req, res) => {

  try {
    const AllProjects = await Projects.find({})

    AllProjects.map((pro) => {
      console.log("pro==>", pro.stacks)
    })
    res.status(201).json(AllProjects);
  }
  catch (err) {

  }
})


router.post("/downloadCV", async (req, res) => {
  try {
    console.log("req", req.body)
    const getHTML = req.body.html;
    var type = process.argv.slice(2)[0] || 'url';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // const html = fs.readFileSync(getHTML, 'utf-8');
    await page.setContent(getHTML, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      path: `result_${type}.pdf`,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });

    console.log("pdf===>", pdf)

    res.status(201).json(pdf);
  }
  catch (err) {
    console.log(err);
  }
});


module.exports = router;