const User = require("../models/Register");
const Car = require("../models/Car");
const bcrypt = require("bcrypt");
const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");

module.exports = {
  Register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
      });

      const user = await newUser.save();
      res.json({
        message: "done",
        data: user,
      });
    } catch (err) {
      res.json(err.message);
    }
  },
  Login: async (req, res) => {
    try {
      const { email, password } = req.body.values;
      console.log(email, password);
      if (email && password) {
        const getUsers = await User.findOne({ email });
        console.log("password", getUsers);
        if (getUsers) {
          const verify = await bcrypt.compare(password, getUsers.password);
          console.log("verification:", verify);
          if (verify) {
            const token = jwt.sign({ id: getUsers._id }, "user", {
              expiresIn: "90d",
            });
            res.json({
              status: "successfull",
              userLength: getUsers.length,
              data: token,
            });
          } else {
            const error = new Error("Cannot get data from database");
            res.json({
              message: error.message,
              stack: error.stack,
            });
          }
        } else {
          const error = new Error("Fields are empty");
          res.json({
            message: error.message,
            stack: error.stack,
          });
        }
      } else {
        res.json({
          status: "500",
          data: "bad request",
        });
      }
    } catch (err) {
      res.json({ message: err.message });
    }
  },
  AddCar: async (req, res) => {
    
    try {
      console.log("fileName:", JSON.stringify(req.files));
      let files = [];
      req.files.forEach((item) => {
        files.push("../uploads/" + item.filename);
      });
      console.log(files);
      const { model, price, phone, city, options } = JSON.parse(
        req.body.values
      );
      const newCar = await Car.create({
        model,
        price,
        phone,
        city,
        options,
        pictures: files,
      });
      console.log("req body:", newCar);
      res.json({ status: 200, data: newCar });
    } catch (err) {
      res.json({ message: err.message });
    }
  },
};
