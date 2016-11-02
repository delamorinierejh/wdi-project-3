require('../spec_helper');

const ClothesItem = require("../../models/clothesItem");
const User = require("../../models/user");

describe("Clothes Items Controller Test", function() {

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

  /// GET ACTIONS HERE (SHOW AND INDEX)

  describe("GET /api/clothesItems", function(done) {

    beforeEach(done => {
      const item = new ClothesItem({
        title:        "Diesel Jeans",
        description:  "These stonewashed jeans are tight fitting and lovely",
        category:     "Jeans",
        sex:          "Male",
        image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
        available:    true
      });
      item.save((err, item) => {
        IDHERE = item._id;
        done();
      });
    });

    //INDEX TESTS

    it("should return a 200 response", function(done) {
      api
      .get("/api/clothesItems")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200, done);
    });

    it("should return a 401 response when no token is provided in the header", function(done) {
      api
      .get("/api/clothesItems")
      .set("Accept", "application/json")
      .expect(401, done);
    });

    it("should return a JSON object", function(done) {
      api
      .get("/api/clothesItems")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
    });

    it("should return an array of items", function(done) {
      api
      .get("/api/clothesItems")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body.clothesItems).to.be.an("array");
        done();
      });
    });

    //SHOW TESTS

    it("should return an object with the following properties", done => {
      api.get(`/api/clothesItems/${IDHERE}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body)
        .to.have.property("clothesItem")
        .and.have.any.keys([
          "title",
          "description",
          "category",
          "sex",
          "image",
          "available"
        ]);
        done();
      });
    });

    it("should return a JSON object", function(done) {
      api
      .get(`/api/clothesItems/${IDHERE}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
    });

    it("should return a 401 when no token is provided in the header", done => {
      api.get(`/api/clothesItems/${IDHERE}`)
      .set('Accept', 'application/json')
      .expect(401, done);
    });

    it("should return a 404 when an authorised user tries to update a non-exsitent item", done =>{
      api.get(`/api/clothesItems/57efa144acc4d0531560c377`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
      })
      .expect(404, done);
    });

  });

  // POST ACTION HERE

  describe("POST /api/clothesItems", function(done) {

    it("should return a 201 when an item is passed in", done => {
      api.post(`/api/clothesItems`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        clothesItem : {
          title:        "Diesel Jeans",
          description:  "These stonewashed jeans are tight fitting and lovely",
          category:     "Jeans",
          sex:          "Male",
          image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg"
        }
      })
      .expect(201, done);
    });

    it("should return a 401 when no token is provided in the header", done => {
      api.post(`/api/clothesItems`)
      .set('Accept', 'application/json')
      .send({
        clothesItem : {
          title:        "Diesel Jeans",
          description:  "These stonewashed jeans are tight fitting and lovely",
          category:     "Jeans",
          sex:          "Male",
          image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg"
        }
      })
      .expect(401, done);
    });

    it("should return a JSON object", function(done) {
      api
      .post(`/api/clothesItems`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        clothesItem : {
          title:        "Diesel Jeans",
          description:  "These stonewashed jeans are tight fitting and lovely",
          category:     "Jeans",
          sex:          "Male",
          image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg"
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
    });

    it("should return an available object", function(done) {
      api
      .post(`/api/clothesItems`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        clothesItem : {
          title:        "Diesel Jeans",
          description:  "These stonewashed jeans are tight fitting and lovely",
          category:     "Jeans",
          sex:          "Male",
          image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg"
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.clothesItem).to.be.an("object");
        expect(res.body.clothesItem).to.have.property("available");
        expect(res.body.clothesItem.available).to.equal(true);
        done();
      });
    });
    it("should be owned by the current user", function(done) {
      api
      .post(`/api/clothesItems`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        clothesItem : {
          title:        "Diesel Jeans",
          description:  "These stonewashed jeans are tight fitting and lovely",
          category:     "Jeans",
          sex:          "Male",
          image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg"
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.clothesItem).to.be.an("object");
        expect(res.body.clothesItem).to.have.property("owner");
        expect(res.body.clothesItem.owner).to.equal(user.id);
        done();
      });
    });
  });


  // PUT ACTION HERE
  describe( "PUT /api/clothesItems:/id", function(done) {

    beforeEach(done => {
      const item = new ClothesItem({
        title:        "Diesel Jeans",
        description:  "These stonewashed jeans are tight fitting and lovely",
        category:     "Jeans",
        sex:          "Male",
        image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
        available:    true
      });
      item.save((err, item) => {
        ID2HERE = item._id;
        done();
      });
    });

    it("should return a 200 when an authorised user updates an exisitng item", done =>{
      api.put(`/api/clothesItems/${ID2HERE}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        title:        "Topman Jeans",
        description:  "These stonewashed jeans are tight fitting and lovely",
        category:     "Jeans",
        sex:          "Male",
        image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
        available:    true
      })
      .expect(200, done);
    });

    it("should return a JSON object", function(done) {
      api
      .put(`/api/clothesItems/${ID2HERE}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        clothesItem : {
          title:        "Topman Jeans",
          description:  "These stonewashed jeans are tight fitting and lovely",
          category:     "Jeans",
          sex:          "Male",
          image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
          available:    true
        }
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
    });

    it("should return a 401 when an unauthorised user updates an exisitng item", done =>{
      api.put(`/api/clothesItems/${ID2HERE}`)
      .set('Accept', 'application/json')
      .send({
        title:        "Topman Jeans",
        description:  "These stonewashed jeans are tight fitting and lovely",
        category:     "Jeans",
        sex:          "Male",
        image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
        available:    true
      })
      .expect(401, done);
    });


    it("should return a 404 when an authorised user tries to update a non-exsitent item", done =>{
      api.put(`/api/clothesItems/${IDHERE}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
      })
      .expect(404, done);
    });

  });

  //DELETE ACTION HERE
  describe( "DELETE /api/clothesItems:/id", function(done) {

    beforeEach(done => {
      const item = new ClothesItem({
        title:        "Diesel Jeans",
        description:  "These stonewashed jeans are tight fitting and lovely",
        category:     "Jeans",
        sex:          "Male",
        image:        "http://i.ebayimg.com/images/g/RfsAAOSwq7JT9Ygz/s-l300.jpg",
        available:    true
      });
      item.save((err, item) => {
        ID2HERE = item._id;
        done();
      });
    });

    it("should return a 204 when an authorised user deletes an existing item", done =>{
      api.delete(`/api/clothesItems/${ID2HERE}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(204, done);
    });

    it("should return a 401 when an unauthorised user deletes an existing item", done =>{
      api.put(`/api/clothesItems/${ID2HERE}`)
      .set('Accept', 'application/json')
      .expect(401, done);
    });


    it("should return a 404 when an authorised user tries to update a non-exsitent item", done =>{
      api.put(`/api/clothesItems/${IDHERE}`)
      .set('Accept', 'application/json')
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(404, done);
    });

  });

  afterEach(done => {
    ClothesItem.collection.remove();
    User.collection.remove();
    done();
  });

});
