const router = require('express').Router();
const UserModel = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { validateSignupData, validateLoginData } = require('../util/validators');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, confirmPassword, handle } = req.body;
    const newUser = {
      email,
      password,
      confirmPassword,
      handle
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    // * check emailexists
    const emailExists = await UserModel.findOne({ email: email });
    console.log(emailExists);
    if (emailExists !== null) {
      return res.status(400).json({ email: 'Email Exists' });
    }

    // * password hashing bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      email,
      password: hashedPassword,
      handle
    });

    let userCreated = await user.save();
    res.json(userCreated);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = {
      email,
      password
    };
    console.log(data);
    const { valid, errors } = await validateLoginData(data);
    console.log(valid, errors);
    if (!valid) return res.status(400).json(errors);

    const user = await UserModel.findOne({ email: email });

    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.header('Authorization', `Bearer ${token}`).json(token);
  } catch (error) {
    console.error(error);

    return res.send(error);
  }
});

module.exports = router;
