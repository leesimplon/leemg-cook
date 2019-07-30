module.exports = (app) => {
    const cuisinier = require('../controllers/cooker.controller');
    const particulier = require('../controllers/particular.controller');
    const atelier = require('../controllers/atelier.controller');

    //route cookers
    app.post('/api/cookers/login', cuisinier.authentifie);
    app.post('/api/cookers/register', cuisinier.inscrire);  
  
    //route ateliers
    app.post('/api/ateliers/', atelier.create);

    app.get('/api/ateliers', atelier.findAll);
    app.get('/api/atelier/:atelierId', atelier.findOne);
    app.get('/api/ateliercook/:cookerId', atelier.findAllCook);
    app.get('/atelier/:image', atelier.readImage);

    app.put('/api/ateliers/:atelierId', atelier.update);
    //route particuliers
    app.post('/api/partics/attend', particulier.enregistre); 
}