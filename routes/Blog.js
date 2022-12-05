const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");
const crypto = require('crypto');
const userModal = require("../Model/user")
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const axios = require("axios");
const cheerio = require("cheerio");
const Posts = require("../Model/BlogSchema");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require("dotenv").config();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { parse } = require("path");
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


const BUCKET_NAME = process.env.BUCKET_NAME;

const BUCKET_REGION = process.env.BUCKET_REGION;

const ACCESS_KEY = process.env.ACCESS_KEY;

const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  region: BUCKET_REGION
})

router.post("/create", async (req, res) => {

  try {

    const {
      title,
      description,
      img,
      topic,
      categories,
      tags,
      author,
      authorID
    } = req.body

    const imageName = generateFileName()

    const params = {
      Bucket: BUCKET_NAME,
      Key: imageName,
      Body: req.files[0].buffer,
      ContentType: req.files[0].mimetype
    }



    const command = new PutObjectCommand(params)

    await s3.send(command);

    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: imageName
    })

    const url = await getSignedUrl(
      s3,
      getCommand)

    const obj = {
      title: title,
      description: description,
      imgName: imageName,
      imgURL: url,
      topic: topic,
      categories: JSON.parse(categories),
      tags: JSON.parse(tags),
      author: author,
      authorID: authorID,
    }

    const posts = await Posts.create(obj);

    const allPosts = await Posts.find({});

    return res.status(200).send(allPosts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getPosts", async (req, res) => {

  try {

    const allPosts = await Posts.find({});

    const posts = JSON.stringify(allPosts);
    let postsParse = JSON.parse(posts);
    let arr = []

    for (let i = 0; i < postsParse.length; i++) {
      let temp = await gettingURL(postsParse[i].imgName);
      postsParse[i].url = temp
    };

    console.log("postsParse", postsParse)

    async function gettingURL(name) {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: name
      })

      let url = await getSignedUrl(
        s3,
        getCommand);

      return url
    }

    // JSON.parse(posts).forEach(async (i) => {
    //   const getCommand = new GetObjectCommand({
    //     Bucket: BUCKET_NAME,
    //     Key: i.imgName
    //   })


    //   url = await getSignedUrl(
    //     s3,
    //     getCommand);


    //   i['url'] = url;

    //   arr.push(i)
    // });




    res.status(201).json(postsParse);
  } catch (err) {
    console.log(err);
  }
});

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
