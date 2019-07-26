const Atelier = require('../models/atelier.model');
const fs = require('fs');

// Create and Save a new atelier
exports.create = (req, res) => {

    Atelier.find()
        .then(atel => {
            //autoincrement
            let idautom;
            if (atel.length == 0) {
                idautom = 0
            } else {
                idautom = parseInt(atel[atel.length - 1]._id) + 1
            }

            
                console.log(req.files)
            let imageFile = req.files.image;
            let nomImg = idautom;
            imageFile.mv(`${__dirname}/public/${nomImg}.jpg`, function (err) {
                if (err) {
                    return res.status(500).send("string");
                }
            });

            
            const atelier = new Atelier({

                _id: idautom,
                
                title: req.body.title,
                idUser: req.body.idUser,
                description:req.body.description,
                date: req.body.date,
                hour:req.body.hour,
                duration:req.body.duration,
                dispo:req.body.dispo ,
                reserve:req.body.reserve ,
                price: req.body.price,
                image: '' + nomImg + '.jpg'
            });
//console.log(atelier.hasOwnProperty("reserve"))
            // Save Atelier in the database
            atelier.save()
                .then(data => { console.log('reussi')
                    res.send(data);
                }).catch(err => {console.log('non reussi,',err)
                    res.status(500).send({
                        message: "Some error occurred while creating the Atelier."
                    });
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

// Find a single atelier with a atelierId
exports.findOne = (req, res) => {
    Atelier.findById(req.params.atelierId)
    .then(atelier => {
        if(!atelier) {
            return res.status(404).send({
                message: "Atelier not found with id " + req.params.atelierId
            });            
        }
        res.send(atelier);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Atelier not found with id " + req.params.atelierId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving atelier with id " + req.params.atelierId
        });
    });
};
//idUser
exports.findOne = (req, res) => {
    Atelier.find({idUser:req.params.idUser})
        .then(atelier => {
            //console.log(unprofil)
            if (!atelier) {
                return res.status(404).send({
                    message: "atelier not found with id" + req.params.idUser
                });
            }
            else {
                res.send(atelier);
            }


        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "atelier not found with id " + req.params.idUser
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving atelier with id " + req.params.idUser
            });
        });
};
//Read image of atelier
exports.readImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./controllers/public/'+req.params.image)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("Something wrong, an error was found: ", e.stack);
    }
}


// Update a atelier identified by the atelierId in the request
exports.update = (req, res) => {

    if(!req.body.title || !req.body.description) {
        return res.status(400).send({
            message: "Atelier content can not be empty"
        });
    }
    console.log('voila params'+req.params.profilId)
    let imageFile = req.files.image;
        //console.log('inona ny ato o!'+imageFile)
        let nomImg = req.params.profilId
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImg }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log('Reussi')
    // Find and update eleve with the request body
    Atelier.findByIdAndUpdate(req.params.profilId, {
        title: req.body.title,
        description:req.body.description,
        date: req.body.date,
        hour:req.body.hour,
        duration:req.body.duration,
        dispo:req.body.dispo,
        reserve:req.body.reserve,
        price: req.body.price,
        image: '' + nomImg + '.jpg'
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Atelier not found with id " + req.params.profilId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Atelier not found with id " + req.params.profilId
            });                
        }
        return res.status(500).send({
            message: "Something wrong upd   ating note with id " + req.params.profilId
        });
    });
    // // Validate Request
    // if(!req.body.title && !req.body.description && !req.body.date && !req.body.hour && !req.body.dispo && !req.body.reserve && !req.body.duration && !req.body.price && !req.files.image) {
    //     return res.status(400).send({
    //         message: "No atelier field can not be empty"
    //     });
    // }

    // let imageFile = req.files.image;
    // let nomImg = req.params.atelierId;
    // imageFile.mv(`${__dirname}/public/${nomImg}.jpg`, function (err) {
    //     if (err) {
    //         return res.status(500).send("string");
    //     }
    // });

    // // Find atelier and update it with the request body
    // Atelier.findByIdAndUpdate(req.params.atelierId, {
    //     title: req.body.title,
    //     description:req.body.description,
    //     date: req.body.date,
    //     hour:req.body.hour,
    //     duration:req.body.duration,
    //     dispo:req.body.dispo,
    //     reserve:req.body.reserve,
    //     price: req.body.price,
    //     image: '' + nomImg + '.jpg'       
    // }, {new: true})
    // .then(atl => {
    //     if(!atl) {
    //         return res.status(404).send({
    //             message: "Atelier not found with id " + req.params.atelierId
    //         });
    //     }
    //     res.send(atl);
    // }).catch(err => {
    //     if(err.kind === 'ObjectId') {
    //         return res.status(404).send({
    //             message: "Atelier not found with id " + req.params.atelierId
    //         });                
    //     }
    //     return res.status(500).send({
    //         message: "Error updating atelier with id " + req.params.atelierId
    //     });
    // });
};

// Delete a atelier with the specified atelierId in the request
exports.delete = (req, res) => {
    Atelier.findByIdAndRemove(req.params.atelierId)
    .then(atelier => {
        if(!atelier) {
            return res.status(404).send({
                message: "Atelier not found with id " + req.params.atelierId
            });
        }
        res.send({message: "Atelier deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Atelier not found with id " + req.params.atelierId
            });                
        }
        return res.status(500).send({
            message: "Could not delete atelier with id " + req.params.atelierId
        });
    });
};

//Desactivier

exports.masquer = (req,res)=>{
    // router.get("/ateliermasquer/:_id",(req,res)=>{

        Atelier.findOneAndUpdate({_id:req.params._id}, { 
            visibilite:false

        },{new:true}).then(upd=>res.send(upd)
        )

    }

    exports.gestion = (req,res) => {
    // router.get("/atelieraffichier/:_id",(req,res)=>{
        Atelier.findOneAndUpdate({_id:req.params._id}, {
            visibilite:true

        },{new:true}).then(upd=>res.send(upd)
        )
    }