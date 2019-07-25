
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/database.config");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load Cooker model
const Cooker = require("../models/cooker.model");

// @route POST api/cookers/register
// @desc Register cooker
// @access Public
exports.inscrire = (req, res) => {

  console.log(req.body);
  
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Cooker.findOne({ email: req.body.email }).then(cooker => {
    if (cooker) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      Cooker.find()
        .then(cooker => {
          //autoincrement
          //var idautom;
          if (cooker.length == 0) {
            idautom = 0
          } else {
            idautom = parseInt(cooker[cooker.length - 1]._id) + 1            
          }
          console.log(idautom);

          const newCooker = new Cooker({
            _id: idautom,
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            specialite: req.body.specialite || 'non précisé',
            password: req.body.password
          });

          //

        //   bcrypt.genSalt((err,salt) =>{
        //     bcrypt.hash(newCooker.password, salt, (err,hash)=>{
        //         if(err) throw err;
        //         newCooker.password = hash;
        //         newCooker
        //             .save()
        //             // .then(profk => res.json(profk))
        //             // .catch(err => {
        //             //     res.status(500).send({
        //             //         message: err.message || "Something wrong while retrieving profils."
        //             //     });
        //             // })
        //     })
        // })
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newCooker.password, salt, (err, hash) => {
              if (err) throw err;
              newCooker.password = hash;
              newCooker
                .save()
                .then(cooker => res.json(cooker))
                .catch(err => console.log(err));
            });
          });
        });
    }
  });
};

// @route POST api/cookers/login
// @desc Login cooker and return JWT token
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
  // Find cooker by email
  Cooker.findOne({ email }).then(cooker => {
    // Check if cooker exists
    if (!cooker) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, cooker.password).then(isMatch => {
      if (isMatch) {
        // Cooker matched
        // Create JWT Payload
        const payload = {
          id: cooker._id,
          name: cooker.name
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
              id: cooker._id,
              name: cooker.name,
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


