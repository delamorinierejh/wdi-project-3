require('../spec_helper');

const User = require("../../models/user");

describe("Users Controller Test", function() {

  let user;

  beforeEach(done => {
    user = new User({
      username: "test",
      email: "test@test.com",
      password: "password",
      passwordConfirmation: "password"
    });

    user.save((err, user) => {
      api.post('/api/login')
      .set("Accept", "application/json")
      .send({
        email: "test@test.com",
        password: "password"
      }).end((err, res) => {
        TOKEN = res.body.token;
        done();
      });
    });
  });

  /// GET ACTIONS HERE (SHOW)

  describe("GET /api/users/:id (SHOW)", function(done) {

    //INDEX TESTS

    it("should return a 200 response", function(done) {
      api
      .get(`/api/users/${user._id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200, done);
    });

    it("should return a 401 response when no token is provided in the header", function(done) {
      api
      .get(`/api/users/${user._id}`)
      .set("Accept", "application/json")
      .expect(401, done);
    });

    it("should return a JSON object", function(done) {
      api
      .get(`/api/users/${user._id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
    });

    it("should return an object with the following properties", done => {
      api
      .get(`/api/users/${user._id}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body)
        .to.have.property("user")
        .and.have.any.keys([
          "username",
          "email",
        ]);
        done();
      });
    });

  });


  // PUT ACTION HERE
  describe( "PUT /api/users:/id", function(done) {

    it("should return a 200 when an authorised users updates their profile", done =>{
      api.put(`/api/users/${user._id}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        username: "test2"
      })
      .expect(200, done);
    });

    it("should return a JSON object", function(done) {
      api
      .put(`/api/users/${user._id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        username: "test2"
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
    });

    it("should return a 401 when an unauthorised user updates an exisitng item", done =>{
      api.put(`/api/users/${user._id}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        username: "test2"
      })
      .expect(200, done);
    });


    it("should return a 404 when an authorised user tries to update a non-exsitent item", done =>{
      api.put(`/api/users/57efa144acc4d0531560c377`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        username: "test2"
      })
      .expect(404, done);
    });

  });

  afterEach(done => {
    User.collection.remove();
    done();
  });

});
