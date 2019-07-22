module.exports = (app) => {
    const cuisinier = require('../controllers/cooker.controller');
    const particulier = require('../controllers/cooker.controller');
    const atelier = require('../controllers/atelier.controller');

    //route cookers
    app.post('/api/cookers/login', cuisinier.authentifie);
    app.post('/api/cookers/register', cuisinier.inscrire);   

    //route particuls
    app.post('/api/partics/login', particulier.authentifie);
    app.post('/api/partics/register', particulier.inscrire);  
  
    //route ateliers
    app.post('/api/ateliers', atelier.create);
    app.get('/api/ateliers', atelier.findAll);
    app.get('/api/ateliers/:atelierId', atelier.findOne);
    app.get('/atelier/:image', atelier.readImage);
    app.put('/api/ateliers/:atelierId', atelier.update);
    app.delete('/api/ateliers/:atelierId', atelier.delete);
}