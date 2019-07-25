const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ParticularSchema = new Schema({
  // atelier: {
  //   type: Schema.Types.ObjectId,
  //   ref: "ateliers"
  // },
  _id: {
    type: Number,
    required: true
  },
  idAtel: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  }
  
},
{
    timestamps: true
});
module.exports = Particular = mongoose.model("particulars", ParticularSchema);