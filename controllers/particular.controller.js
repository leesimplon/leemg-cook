
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/database.config");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load Particular  model
const Particular  = require("../models/particular.model");

// @route POST api/particular s/register
// @desc Register particular 
// @access Public
exports.inscrire = (req, res) => {
    Particular.find()
        .then(particular => {
            //autoincrement
            let idautom;
            if (particular.length == 0) {
                idautom = 0
            } else {
                idautom = parseInt(particular[particular.length - 1]._id) + 1
            }
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Particular.findOne({ email: req.body.email }).then(particular  => {
      if (particular ) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newParticular  = new Particular({
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newParticular .password, salt, (err, hash) => {
            if (err) throw err;
            newParticular .password = hash;
            newParticular 
              .save()
              .then(particular  => res.json(particular ))
              .catch(err => console.log(err));
          });
        });
      }
    });
})
  };

  // @route POST api/particular s/login
// @desc Login particular  and return JWT token
// @access Public
exports.authentifie = (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find particular  by email
  Particular.findOne({ email }).then(particular  => {
      // Check if particular  exists
      if (!particular ) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, particular .password).then(isMatch => {
        if (isMatch) {
          // Particular matched
          // Create JWT Payload
          const payload = {
            id: particular .id,
            name: particular .name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  };

  
