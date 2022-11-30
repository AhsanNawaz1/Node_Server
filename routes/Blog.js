const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");
const userModal = require("../Model/user")
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const axios = require("axios");
const cheerio = require("cheerio");
const Posts = require("../Model/BlogSchema");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })



router.post('/create', upload.single('uploaded_file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log(req.file, req.body)
});


// router.post("/create", async (req, res) => {
//   console.log("req===> ", req.files);
//   return res.status(200).send(req.files)
//   // try {

//   //   const {
//   //     title,
//   //     description,
//   //     img,
//   //     topic,
//   //     categories,
//   //     tags,
//   //     author
//   //   } = req.body

//   //   console.log("req", req.body)


//   //   if (!(title &&
//   //     description &&
//   //     img &&
//   //     topic &&
//   //     categories &&
//   //     tags &&
//   //     author)) {
//   //     return res.status(400).send("All input is required");
//   //   }

//   //   const posts = await Posts.create({
//   //     title,
//   //     description,
//   //     img,
//   //     topic,
//   //     categories,
//   //     tags,
//   //     author
//   //   });



//   //   return res.status(200).send(posts);
//   // } catch (err) {
//   //   console.log(err);
//   // }
// });

// router.get("/getCRUD", async (req, res) => {

//   try {

//     const crudTable = await CRUD.find({})

//     res.status(201).json(crudTable);
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/update/:id", async (req, res) => {

//   try {
//     let id = req.params.id;
//     console.log("req.body", req.body)
//     let crud = await CRUD.findOneAndUpdate({ _id: id }, req.body, { new: true })
//     res.status(200).json(crud);
//   }
//   catch (err) {
//     console.log(err)
//   }
// })

// router.delete("/delete/:id", async (req, res) => {

//   try {
//     let id = req.params.id;


//     await CRUD.findOneAndDelete({ _id: id });
//     let resp = {
//       msg: "Deleted Successfully"
//     }

//     res.status(200).json(resp);
//   }
//   catch (err) {
//     console.log(err)
//   }
// })




module.exports = router;
