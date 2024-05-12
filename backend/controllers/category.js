const { response } = require("express");
const Category = require("../models/Category");
const Course = require("../models/Course");

//create createCategory ka handler functionn

exports.createCategory = async (req, res) => {
  try {
    console.log("req body in create category: ", req.body);
    //fetch data
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    //return response

    return res.status(200).json({
      success: true,
      message: "category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAlltags handler function
exports.showAllCategories = async (req, res) => {
  try {
    const allcategory = await Category.find(
      {},
      { name: true, description: true }
    );

    res.status(200).json({
      success: true,
      message: "All category return successfully",
      data: allcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryID
    const { categoryID } = req.body;
    //get course for specified categoryId
    const selectedCategory = await Category.findById(categoryID)
      .populate("courses")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    //get coursesfor different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryID }, //ne means not equal
    })
      .populate("courses")
      .exec();

    //get top selling courses
    //HW - write it on your on

    const topSellingCourses = await Course.find()
      .sort({ salesCount: -1 }) // Sort by salesCount in descending order to get top selling courses first
      .limit(5) // Limit to the top 5 selling courses
      .exec();

    // return response

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        topSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
