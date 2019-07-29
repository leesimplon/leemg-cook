const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AtelierSchema = new Schema({
  // cooker: {
  //   type: Schema.Types.ObjectId,
  //   ref: "cookers"
  // },
  _id: {
    type: Number,
    required: true
  },
  idCooker: {
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
    type: String,
    required: true
  },
  dispo: {
    type: Number,
    required: true
  },
  reserve: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  visible: Boolean,
},
 
{
    timestamps: true
});

module.exports = Product = mongoose.model("atelier", AtelierSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true
