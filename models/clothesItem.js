const mongoose = require('mongoose');

const clothesItemSchema = new mongoose.Schema({
  title:        { type: String, trim: true, required: true },
  description:  { type: String, trim: true },
  category:     { type: String, trim: true },
  sex:          { type: String, trim: true, required: true },
  image:        { type: String, required: true, trim: true },
  available:    { type: Boolean, required: true, default: true },
  owner:        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: true
});

module.exports = mongoose.model("ClothesItem", clothesItemSchema);
