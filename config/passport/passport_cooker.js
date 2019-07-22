const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Cooker = require("../../models/cooker.model")
const keys = require("../database.config");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport_cooker => {
  passport_cooker.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Cooker.findById(jwt_payload.id)
        .then(cooker => {
          if (cooker) {
            return done(null, cooker);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};