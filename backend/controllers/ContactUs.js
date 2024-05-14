const ContactUs = require("../models/ContactUs");

exports.contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, contactNumber, message } = req.body.data;
    console.log("at backend request - ", req.body);
    if (!firstName || !lastName || !email || !contactNumber || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are requiredddd" });
    }

    const result = await ContactUs.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNumber: contactNumber,
      message: message,
    });
    console.log("contact us data - ", result);
    return res.status(200).json({
      success: true,
      message: "contact us message saved to db",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
