module.exports = {
  db: {
    test : "mongodb://localhost/swish-list-test",
    development : "mongodb://localhost/swish-list-development",
    production : "mongodb://localhost/swish-list"
  },
  secret: process.env.SECRET || "gosh this is so secret... shhh..."
};
