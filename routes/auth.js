const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//Registration
router.post('/register', async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
    phoneNo: req.body.phoneNo,
  });
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("User doesn't exist");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    //Error occured due to character encoder mismatch
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    decryptedPassword !== req.body.password &&
      res.status(401).json('Wrong Credentials');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
