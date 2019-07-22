const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AtelierSchema = new Schema({
  cooker: {
    type: Schema.Types.ObjectId,
    ref: "cookers"
  },
  _id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  dispo: {
    type: Number,
    required: true
  },
  reserve: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  }
},
{
    timestamps: true
});

module.exports = Product = mongoose.model("atelier", AtelierSchema);
