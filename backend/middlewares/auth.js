const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const { json } = require("express");

exports.auth = async (req, res, next) => {
  console.log("Auth  middleware");
  // console.log("Instructor check middleware");
  console.log("req body auth: ", req.body);
  try {
    // Extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    // If token is missing, return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
    } catch (error) {
      // Token verification failed
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next(); // Call next middleware or route handler
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  console.log(" is Student fun middleware");
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for student only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified ,please try again",
    });
  }
};

//IsInstructor
exports.IsInstructort = async (req, res, next) => {
  console.log("Instructor fun middleware");
  // console.log("Instructor check middleware");
  console.log("req body isinstructor: ", req.body);
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructor only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified ,please try again",
    });
  }
};

//isAdmine

exports.isAdmin = async (req, res, next) => {
  console.log("admin check middleware");
  console.log("req body auth: ", req.body);
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
