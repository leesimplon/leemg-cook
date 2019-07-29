// Load input validation
const validateAttendInput = require("../validation/attend");
// Load Particular  model
const Particular = require("../models/particular.model");
const Atelier = require("../models/atelier.model");
//const atelier = require('./atelier.controller');
// @route POST api/particular s/register
// @desc Register particular
// @access Public
exports.enregistre = (req, res) => {
  Particular.find().then(particular => {
    //autoincrement
    //let idautom;
    if (particular.length == 0) {
      idautom = 0;
    } else {
      idautom = parseInt(particular[particular.length - 1]._id) + 1;
    }
    // Form validation
    const { errors, isValid } = validateAttendInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Particular.findOne({ email: req.body.email }).then(particular => {
      if (particular) {
        return res.status(400).json({ email: "Email existe déjà" });
      } else {
        const particular = new Particular({
          _id: idautom,
          idAtel: req.body.idAtel,
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          phone: req.body.phone
        });
        console.log(req.body.idAtel);

        // Save Atelier in the database
        particular
          .save()
          .then(data => {
            res.send(data);
            //Reservation atelier
            // Find atelier and update it with the request body
            Atelier.findById(req.body.idAtel)
              .then(res => {
                console.log(res);                
                Atelier.findByIdAndUpdate(req.body.idAtel, {  reserve: parseInt(res.reserve) + 1, dispo:parseInt(res.dispo) - 1  } , {useFindAndModify: false})
                  .then(resp => {
                    res.send(resp)
                  }).catch(err => {
                    console.log(err.kind+' and '+err.stack);
                  })
              }).catch(err => {
                console.log(err.kind+' and '+err.stack);

              })

            // Atelier.findByIdAndUpdate(req.body.idAtel, {reserve: + 1})
            //     .then(resp => {
            //         res.send(resp)
            //     }).catch(err => {
            //         console.log(err);

            //     })

          })
          .catch(err => {
            res.status(500).send({
              message: "Some error occurred while creating the Particular."
              //console.log(err.kind+" and "+err.stack);
            });
            console.log(err.kind + " and " + err.stack);
          });
      }
    });
  });
};
