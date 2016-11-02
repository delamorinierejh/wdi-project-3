const express    = require("express");
const morgan     = require("morgan");
const mongoose   = require("mongoose");
const bodyParser = require("body-parser");
const app        = express();
const environment = app.get("env");
const port       = process.env.PORT || 3000;
const cors       = require("cors");
const expressJWT = require("express-jwt");
const router     = require("./config/routes");
const config     = require("./config/config");

mongoose.connect(config.db[environment]);

if (environment !== "test") app.use(morgan("dev"));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api", expressJWT({ secret: config.secret })
  .unless({
    path: [
      { url: "/api/register", methods: ["POST"] },
      { url: "/api/login",    methods: ["POST"] }
      // { url: "/api/transactions",    methods: ["POST"] },
      // { url: "/api/transactions/:id/swishback",    methods: ["PUT"] },
      // { url: "/api/transactions/:id/approve",    methods: ["PUT"] },
      // { url: "/api/transactions/:id/reject",    methods: ["PUT"] },
      // { url: "/api/transactions/:id/reject",    methods: ["PUT"] },
    ]
  }));
app.use(jwtErrorHandler);

function jwtErrorHandler(err, req, res, next){
  if (err.name !== "UnauthorizedError") return next();
  return res.status(401).json({ message: "Unauthorized request." });
}

const User = require("./models/user");
const jwt  = require("jsonwebtoken");

function assignUser(req, res, next){
  let token = getToken(req, res);
  if (!token) return next();
  const payload = jwt.verify(token, config.secret);
  User.findById(payload.id, (err, user) => {
    if (err || !user) res.status(500).json({ message: "Invalid JWT provided."});
    req.user = user;
    return next();
  });
}

function getToken(req, res){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
}

app.use(assignUser);

app.use("/api", router);

app.get("/*", (req, res) =>  res.sendFile(__dirname + "/index.html"));

app.listen(port, () =>  console.log(`Express has started on port: ${port}`));

module.exports = app;
