module.exports = (app) => {
    const cuisinier = require('../controllers/cooker.controller');
    const particulier = require('../controllers/particular.controller');
    const atelier = require('../controllers/atelier.controller');

    //route cookers
    app.post('/api/cookers/login', cuisinier.authentifie);
    app.post('/api/cookers/register', cuisinier.inscrire);  
    //visibilte atelier 
app.get('/masque/:_id',atelier.masquer);
app.get('/afficher/:_id',atelier.gestion);
    //route particuls
    // app.post('/api/login', particulier.authentifie);
    app.post('/register/:_id', particulier.inscrire);  
  
    //route ateliers
    app.post('/api/ateliers', atelier.create);
    app.get('/api/ateliers', atelier.findAll);
    app.get('/api/ateliers/:atelierId', atelier.findOne);
    app.get('/atelier/:image', atelier.readImage);
    app.put('/api/ateliers/:profilId', atelier.update);
    app.delete('/api/ateliers/:atelierId', atelier.delete);

    app.get('/api/atelier/:idUser', atelier.findOne);
}