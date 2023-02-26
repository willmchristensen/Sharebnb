const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Username is required'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    handleValidationErrors
];
// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username,firstName, lastName } = req.body;

      const emailStorage = await User.findAll({
        where: {
          email: email,
        }
      });

      const userNameStorage = await User.findAll({
        where: {
          username: username,
        }
      });

      let emailExists = emailStorage.length > 0;
      let userNameExists = userNameStorage.length > 0;

      if(emailExists){
        return res.status(403).json({message: "User already exists", errors: ["User with that email already exists"]})
      }else if(userNameExists){
        return res.status(403).json({message: "User already exists", errors: ["User with that username already exists"]})
      }else{
        let user = await User.signup({ email, password, username,firstName, lastName });

        let token = await setTokenCookie(res, user);

        user = user.toJSON();
        user.token = token;

        return res.json(user);
      }

    }
);
module.exports = router;
