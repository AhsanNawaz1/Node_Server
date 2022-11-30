const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");
const userModal = require("../Model/user")
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

const CRUD = require("../Model/CRUDSchema");

router.post("/create", async (req, res) => {

  try {
    const { Name, Number, Role } = req.body;

    if (!(Name && Number && Role)) {
      res.status(400).send("All input is required");
    }

    const crud = await CRUD.create({
      Name,
      Number,
      Role,
    });

    res.status(201).json(crud);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getCRUD", async (req, res) => {

  try {

    const crudTable = await CRUD.find({})

    res.status(201).json(crudTable);
  } catch (err) {
    console.log(err);
  }
});

router.post("/update/:id", async (req, res) => {

  try {
    let id = req.params.id;
    console.log("req.body", req.body)
    let crud = await CRUD.findOneAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json(crud);
  }
  catch (err) {
    console.log(err)
  }
})

router.delete("/delete/:id", async (req, res) => {

  try {
    let id = req.params.id;


    await CRUD.findOneAndDelete({ _id: id });
    let resp = {
      msg: "Deleted Successfully"
    }

    res.status(200).json(resp);
  }
  catch (err) {
    console.log(err)
  }
})




module.exports = router;
