module.exports = (app) => {
    const cuisinier = require('../controllers/cooker.controller');
    const particulier = require('../controllers/particular.controller');
    const atelier = require('../controllers/atelier.controller');

    //route cookers
    app.post('/api/cookers/login', cuisinier.authentifie);
    app.post('/api/cookers/register', cuisinier.inscrire);  
    
    //app.post('/register/:_id', particulier.inscrire);  
  
    //route ateliers
    app.post('/api/ateliers/', atelier.create);

    app.get('/api/ateliers', atelier.findAll);
    app.get('/api/atelier/:atelierId', atelier.findOne);
    app.get('/api/ateliercook/:cookerId', atelier.findAllCook);
    app.get('/atelier/:image', atelier.readImage);

    app.put('/api/ateliers/:atelierId', atelier.update);
    app.delete('/api/ateliers/:atelierId', atelier.delete);

    app.get('/api/ateliermask/:atelierId', atelier.masquer);
    app.get('/api/ateliershow/:atelierId', atelier.afficher);
    //route particuliers
    app.post('/api/partics/attend', particulier.enregistre); 
}