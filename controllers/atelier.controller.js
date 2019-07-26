const Atelier = require('../models/atelier.model');
//const Cooker = require('../models/cooker.model');
const fs = require('fs');

// Create and Save a new atelier
exports.create = (req, res) => {

    Atelier.find()
        .then(atel => {
            //autoincrement
            //let idautom;
            if (atel.length == 0) {
                idautom = 0
            } else {
                idautom = parseInt(atel[atel.length - 1]._id) + 1
            }
            console.log(req.files.image);
            let imageFile = req.files.image;

            let nomImg = idautom;
            imageFile.mv(`${__dirname}/public/${nomImg}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send("string");
                }
            });

            console.log(idautom);
            console.log(req.body.idCook);
            console.log(req.body.title);
            console.log(req.body.description);
            console.log(req.body.date);
            console.log(req.body.hour);
            console.log(req.body.duration);
            console.log(req.body.dispo);
            console.log(req.body.reserve);
            console.log(req.body.price);
            const atelier = new Atelier({
                _id: idautom,
                idCook: req.body.idCook,
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                hour: req.body.hour,
                duration: req.body.duration,
                dispo: req.body.dispo,
                price: req.body.price,
                image: '' + nomImg + '.jpg'
            });

            // Save Atelier in the database
            atelier.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: "Some error occurred while creating the Atelier. " + err.kind + " and " + err.stack
                        //                        
                    });
                    console.log(err.kind + " and " + err.stack)
                });
        }).catch(err => {
            res.status(500).send({
                message: "ERROR-> " + err.kind + " and " + err.stack
            });
        });
};

// Retrieve and return all ateliers from the database.
exports.findAll = (req, res) => {
    Atelier.find()
        .then(ateliers => {
            res.send(ateliers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ateliers."
            });
        });
};

// Retrieve and return all ateliers inserted by cooker from the database.
exports.findAllCook = (req, res) => {
    Atelier.find({ "idCook": req.params.idCook })
        .then(ateliers => {
            res.send(ateliers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ateliers."
            });
        });
};

// Find a single atelier with a atelierId
exports.findOne = (req, res) => {
    Atelier.findById(req.params.atelierId)
        .then(atelier => {
            if (!atelier) {
                return res.status(404).send({
                    message: "Atelier not find with id " + req.params.atelierId
                });
            }
            res.send(atelier);
        }).catch(err => {
            console.log(err.stack);
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Atelier not found with id " + req.params.atelierId
                });

            }
            return res.status(500).send({
                message: "Error retrieving atelier with id " + req.params.atelierId
            });
        });
};

//Read image of atelier
exports.readImage = (req, res) => {
    try {
        let picture = fs.readFileSync('./controllers/public/' + req.params.image)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("Hey Lee, an error was found: ", e.stack);
    }
}


// Update a atelier identified by the atelierId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.title && !req.body.description && !req.body.date && !req.body.hour && !req.body.dispo && !req.body.reserve && !req.body.duration && !req.body.price && !req.files.image) {
    //     return res.status(400).send({
    //         message: "No atelier field can not be empty"
    //     });
    // }
    Atelier.findById(req.params.atelierId)
        .then(res => {
            console.log(res);
            let imageFile = req.files.image;
            let nomImg = req.params.atelierId;
            imageFile.mv(`${__dirname}/public/${nomImg}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send("string");
                }
            });

            // Find atelier and update it with the request body
            Atelier.findByIdAndUpdate(req.params.atelierId, {
                title: req.body.title || res.title,
                description: req.body.description || res.description,
                date: req.body.date || res.date,
                hour: req.body.hour || res.hour,
                duration: req.body.duration || res.duration,
                dispo: req.body.dispo || res.dispo,
                reserve: req.body.reserve || res.reserve,
                price: req.body.price || res.price,
                visible: req.body.visible || res.visible,
                image: '' + nomImg + '.jpg' || res.image
            }, { new: true , useFindAndModify: false})
                .then(atl => {
                    if (!atl) {
                        return res.status(404).send({
                            message: "Atelier not found with id " + req.params.atelierId
                        });
                    }
                    res.send(atl);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Atelier not found with id " + req.params.atelierId
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating atelier with id " + req.params.atelierId
                    });
                });
        }).catch(err => {
            console.log(err.kind + ' and ' + err.stack);

        })


};

//// Update the visibility of an atelier identified by the atelierId in the request
exports.visibilite = (req,res)=>{
    Atelier.findById(req.params._id).then(answer=>{
        Atelier.findOneAndUpdate({_id:req.params.atelierId}, {

            visible:!answer.visible

        },{new:true}).then(upd=>res.send(upd)
        )
    })
}


exports.delete = (req, res) => {
    Atelier.findByIdAndRemove(req.params.atelierId)
        .then(atelier => {
            if (!atelier) {
                return res.status(404).send({
                    message: "Atelier not found with id " + req.params.atelierId
                });
            }
            res.send({ message: "Atelier deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Atelier not found with id " + req.params.atelierId
                });
            }
            return res.status(500).send({
                message: "Could not delete atelier with id " + req.params.atelierId
            });
        });
};