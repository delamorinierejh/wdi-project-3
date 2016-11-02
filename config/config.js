module.exports = {
  db: {
    test : "mongodb://localhost/swish-list-test",
    development : "mongodb://localhost/swish-list-development",
    production : process.env.MONGODB_URI || "mongodb://heroku_xp9hccgt:6kl2cla9r6tk3vuqsivrq1kdhn@ds141937.mlab.com:41937/heroku_xp9hccgt"
  },
  secret: process.env.SECRET || "gosh this is so secret... shhh..."
};
