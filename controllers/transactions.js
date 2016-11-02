module.exports = {
  index:      transactionsIndex,
  create:     transactionsCreate,
  swishback:  transactionsSwishback,
  approve:    transactionsApprove,
  reject:     transactionsReject
};

const Transaction = require('../models/transaction');

function transactionsIndex(req, res) {
  let query = {};
  if (req.query.initiator) query.initiator = req.user._id;
  if (req.query.responder) query.responder = req.user._id;
  if (req.query.status) query.status = req.query.status;
  if (req.query.activeDeal) query.status = {
    $in: [1,2]
  };

  // Transaction.query({ user: CurrentUser.})

  Transaction.find(query)
    .populate(['initiator', 'responder', 'initial_item', 'response_item'])
    .exec((err, transactions) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(200).json({ transactions });
  });
}

function transactionsCreate(req, res){
  const transaction     = new Transaction(req.body.transaction);
  transaction.initiator = req.user._id;
  transaction.save((err, transaction) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(201).json({ transaction });
  });
}

function transactionsSwishback(req, res){
  console.log(req.params.id);
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) return res.status(500).json({ err });
    if (!transaction) return res.status(404).json({ message: "Swish not found" });
    if (!req.body.transaction && !req.body.transaction.response_item) return res.status(500).json({ message: "Please include a response item!" });
    transaction.response_item = req.body.transaction.response_item;
    transaction.status        = 2;
    transaction.save((err, transaction) => {
      if (err) return res.status(500).json({ err });
      return res.status(200).json({ transaction });
    });
  });
}

// Find all transactons with initial_item and set 'status' to 4.
function transactionsApprove(req, res){
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) return res.status(500).json({ err });
    if (!transaction) return res.status(404).json({ message: "Swish not found" });
    if (transaction.status !== 2) return res.status(500).json({ message: "You are unable to approve this swish."});
    transaction.status = 3;
    transaction.save((err, transaction) => {
      if (err) return res.status(500).json({ err });
      return res.status(200).json({ transaction });
    });
  });
}

// Change 'status' to 4.
function transactionsReject(req, res){
  Transaction.findById(req.params.id, (err, transaction) => {
    if (err) return res.status(500).json({ err });
    if (!transaction) return res.status(404).json({ message: "Swish not found" });
    transaction.status = 4;
    transaction.save((err, transaction) => {
      if (err) return res.status(500).json({ err });
      return res.status(200).json({ transaction });
    });
  });
}
