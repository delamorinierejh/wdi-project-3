require('../spec_helper');

const Transaction = require("../../models/transaction");
const ClothesItem = require("../../models/clothesItem");
const User        = require("../../models/user");

describe("Transactions Controller Tests", function() {

  let user1, user2, user3, item1, item2, transaction1, transaction2, token1, token2, token3;

  beforeEach(done => {
    user1 = new User({
      username: "test",
      email: "test@test.com",
      password: "password",
      passwordConfirmation: "password"
    });

    // Create user 1.
    user1.save((err, user) => {
      api.post('/api/login')
      .set("Accept", "application/json")
      .send({
        email: "test@test.com",
        password: "password"
      }).end((err, res) => {
        token1 = res.body.token;
        done();
      });
    });
  });

  beforeEach(done => {
    user2 = new User({
      username: "test2",
      email: "test2@test.com",
      password: "password",
      passwordConfirmation: "password"
    });

    // Create user 2.
    user2.save((err, user) => {
      api.post('/api/login')
      .set("Accept", "application/json")
      .send({
        email: "test2@test.com",
        password: "password"
      }).end((err, res) => {
        token2 = res.body.token;
        done();
      });
    });
  });

  beforeEach(done => {
    user3 = new User({
      username: "test3",
      email: "test3@test.com",
      password: "password",
      passwordConfirmation: "password"
    });

    // Create user 2.
    user3.save((err, user) => {
      api.post('/api/login')
      .set("Accept", "application/json")
      .send({
        email: "test3@test.com",
        password: "password"
      }).end((err, res) => {
        token3 = res.body.token;
        done();
      });
    });
  });

  // Create item 1.
  beforeEach(done => {
    item1 = new ClothesItem({
      title:        "Diesel Jeans",
      description:  "These stonewashed jeans are tight fitting and lovely",
      category:     "Jeans",
      sex:          "Male",
      image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
      owner:        user1._id
    });
    item1.save((err, item1) => {
      done();
    });
  });

  // Create item 2.
  beforeEach(done => {
    item2 = new ClothesItem({
      title:        "Topman Jumper",
      description:  "These jumper is scratchy",
      category:     "Jumper",
      sex:          "Male",
      image:        "http://coolspotters.com/files/photos/813074/topman-jumper-profile.jpg",
      owner:        user2._id
    });
    item2.save((err, item2) => {
      done();
    });
  });

  beforeEach(function(done){
    api
    .post(`/api/transactions`)
    .set('Accept', 'application/json')
    .set("Authorization", `Bearer ${token1}`)
    .send({
      transaction : {
        initial_item:  item2._id,
      }
    })
    .end((err, res) => {
      transaction1 = res.body.transaction;
      done();
    });
  });

  beforeEach(function(done){
    api
    .post(`/api/transactions`)
    .set('Accept', 'application/json')
    .set("Authorization", `Bearer ${token3}`)
    .send({
      transaction : {
        initial_item:  item2._id,
      }
    })
    .end((err, res) => {
      transaction2 = res.body.transaction;
      done();
    });
  });

  // Create transaciton test.
  describe("Task POST to /api/transactions", function(done) {

    beforeEach(function(done) {
      Transaction.collection.remove();
      done();
    });

    it("should return a valid transaction object", done => {
      api.post(`/api/transactions`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token1}`)
      .send({
        transaction : {
          initial_item:  item2._id,
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.transaction).to.be.an("object");
        expect(res.body.transaction)
        .and.have.all.keys([
          'initiator',
          'responder',
          'initial_item',
          'status',
          '_id',
          'createdAt',
          'updatedAt',
          '__v'
        ]);
        done();
      });
    });

    it("should not allow you to request the same initial item when that item is involved with a transaction status of 1", done => {
      api.post(`/api/transactions`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token1}`)
      .send({
        transaction : {
          initial_item:  item2._id,
        }
      })
      .end((err, res) => {
        api.post(`/api/transactions`)
        .set('Accept', 'application/json')
        .set("Authorization", `Bearer ${token1}`)
        .send({
          transaction : {
            initial_item:  item2._id,
          }
        }).end((err, res) => {
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.equal("Transaction validation failed");
          done();
        });
      });
    });

    // Create transaction unauthorised test.
    it("Task POST to /api/transactions as an unauthorised user.", done => {
      api.post(`/api/transactions`)
      .set('Accept', 'application/json')
      .send({
        transaction : {
          initial_item:  item1._id
        }
      })
      .expect(401, done);
    });

  });

  // Swishback/edit/update transactions test.
  describe("Task PUT swishback to /api/transactions", function(done) {

    it("Returns a transaction object with a response_item when a swishback is made", function(done) {
      api.put(`/api/transactions/${transaction1._id}/swishback`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token2}`)
      .send({
        transaction : {
          response_item:  item1._id,
        }
      })
      .end((err, res) => {
        expect(res.body)
        .to.have.property("transaction")
        .and.have.all.keys([
          'initiator',
          'responder',
          'initial_item',
          'status',
          '_id',
          'createdAt',
          'updatedAt',
          '__v',
          'response_item'
        ]);
        done();
      });
    });

    it("Returns a transaction object with a status of 2", function(done) {
      api.put(`/api/transactions/${transaction1._id}/swishback`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token2}`)
      .send({
        transaction : {
          response_item:  item1._id,
        }
      })
      .end((err, res) => {
        expect(res.body.transaction.status)
        .to.equal(2);
        done();
      });
    });

    it("Returns a 401 when a swishback is made with no token", function(done) {
      api.put(`/api/transactions/${transaction1._id}/swishback`)
      .set('Accept', 'application/json')
      .send({
        transaction : {
          response_item:  item2._id,
        }
      }).expect(401, done);
    });
  });

  describe("Task PUT accept to /api/transactions/:id/accept", function(done) {

    it("should accept a transaction and change it's status", function(done){
      api
      .put(`/api/transactions/${transaction1._id}/swishback`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token1}`)
      .send({
        transaction : {
          response_item:  item2._id,
        }
      })
      .end((err, res) => {
        api
        .put(`/api/transactions/${transaction1._id}/approve`)
        .set('Accept', 'application/json')
        .set("Authorization", `Bearer ${token1}`)
        .send()
        .end((err, res) => {
          expect(res.body.transaction.status).to.equal(3);
          done();
        });
      });
    });

    it("should not accept a transaction with a status of 1", function(done){
      api
      .put(`/api/transactions/${transaction1._id}/approve`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token1}`)
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        done();
      });
    });

    it("should make other transactions status 4 if one transaction is accepted", function(done){
      api
      .put(`/api/transactions/${transaction1._id}/swishback`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${token2}`)
      .send({
        transaction : {
          response_item:  item2._id,
        }
      })
      .end((err, res) => {
        api
        .put(`/api/transactions/${transaction1._id}/approve`)
        .set('Accept', 'application/json')
        .set("Authorization", `Bearer ${token1}`)
        .send()
        .end((err, res) => {
          expect(res.body.transaction.status).to.equal(3);

          Transaction.findById(transaction2, (err, transaction) => {
            if (err) return done(err);
            expect(transaction.status).to.equal(4);
            done();
          });
        });
      });
    });

    describe("Task PUT accept to /api/transactions/:id/reject", function(done) {

      it("should reject a transaction and change it's status to 4 if that item has not been swishedback", function(done){
        api
        .put(`/api/transactions/${transaction1._id}/reject`)
        .set('Accept', 'application/json')
        .set("Authorization", `Bearer ${token1}`)
        .send()
        .end((err, res) => {
          expect(res.body.transaction.status).to.equal(4);
          done();
        });
      });

      it("should reject a transaction and change it's status to 4 if that item has been swishedback", function(done){
        api
        .put(`/api/transactions/${transaction1._id}/swishback`)
        .set('Accept', 'application/json')
        .set("Authorization", `Bearer ${token2}`)
        .send({
          transaction : {
            response_item:  item2._id,
          }
        })
        .end((err, res) => {
          api
          .put(`/api/transactions/${transaction1._id}/reject`)
          .set('Accept', 'application/json')
          .set("Authorization", `Bearer ${token1}`)
          .send()
          .end((err, res) => {
            expect(res.body.transaction.status).to.equal(4);
            done();
          });
        });
      });
    });

  });

  afterEach(done => {
    User.collection.remove();
    ClothesItem.collection.remove();
    Transaction.collection.remove();
    done();
  });
});
