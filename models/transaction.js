const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  initiator:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  responder:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  initial_item:     { type: mongoose.Schema.Types.ObjectId, ref: "ClothesItem", required: true },
  response_item:    { type: mongoose.Schema.Types.ObjectId, ref: "ClothesItem" },
  status:           { type: Number, enum: [1,2,3,4], required: true, default: 1 }
}, {
  timestamps: true
});

transactionSchema.pre("validate", function(done) {
  const self = this;
  if (!self.isNew) return done();

  self
    .model("ClothesItem")
    .findById(self.initial_item, (err, clothesItem) => {
      if (err) return done(err);
      self.responder = clothesItem.owner;
      return done();
    });
});

transactionSchema.pre("validate", function(done) {
  const self = this;
  if (!self.isNew) return done();

  self
    .model("Transaction")
    .findOne({
      initiator: self.initiator,
      initial_item: self.initial_item,
      status: { $in: [1, 2, 3] }
    }, (err, transaction) => {
      if (err) return done(err);
      if (transaction) {
        self.invalidate("initial_item", "You are not able to swish the same item twice.");
      }
      return done();
    });
});

transactionSchema.pre("save", function(done) {
  const self = this;
  if (self.isNew || self.status !== 3) return done();

  // If it's 3!
  self
    .model("Transaction")
    .update({
      _id: { $ne: self._id },
      $and: [
        {
          $or: [
            { initial_item: self.initial_item },
            { response_item: self.initial_item }
          ],
        }, {
          $or: [
            { initial_item: self.response_item },
            { response_item: self.response_item }
          ],
        }
      ]
    }, {
      status: 4
    }, {
      multi: true
    }, (err, transactions) => {
      if (err) return done(err);
      return done();
    });
});

transactionSchema.pre("save", function(done) {
  const self = this;
  if (self.isNew || self.status !== 3) return done();
  self
    .model("ClothesItem")
    .update({
      _id: { $in: [self.initial_item, self.response_item] }
    }, {
      available: false
    }, {
      multi: true
    }, (err, clothesItems) => {
      if (err) return done(err);
      return done();
    });
});

module.exports = mongoose.model("Transaction", transactionSchema);
