const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Particular = require("../../models/particular.model")
const keys = require("../database.config");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport_particular => {
  passport_particular.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Particular.findById(jwt_payload.id)
        .then(particular => {
          if (particular) {
            return done(null, particular);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};