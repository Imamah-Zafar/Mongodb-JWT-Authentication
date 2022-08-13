import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class Controller {
  findAll = async (req, res) => {
    try {
      //exclude password field from the response
      const userData = await User.find().select('-password');
      res.json({ ListOfUsers: userData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      // Validate request
      if (!req.body) {
        return res.status(400).send({
          message: "Please fill all required field",
        });
      }
      //Check if email exists 
      const emailExists = await User.findOne({email:req.body.email});
      if(emailExists){
        res.status(400).send({
          message: "Email already exists",
        });
        return;
      }
      // Create a new User
      const user = new User(req.body);
      //encrypt password
      user.password = bcrypt.hashSync(req.body.password, 10);
      // Save user in database
      const createUser = await user.save();
      res.status(201).json({ user: createUser});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findOne = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        is_active: req.body.is_active,
      });
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).send({
        message: "User sucessfully updated"
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(200).send({
        message: "User sucessfully deleted"
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  sign_in = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      //Check if user email exists or password is incorrect
      if (!user || !user.comparePassword(req.body.password)) {
        return res
          .status(401)
          .json({
            message: "Authentication failed. Invalid user or password.",
          });
      }

      return res.json({
        token: jwt.sign(
          { email: user.email, first_name: user.first_name, _id: user._id },
          process.env.TOKEN_KEY
        ),
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}


