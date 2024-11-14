const authRouter = require("express").Router();


authRouter.use("/user", require('./user'));


module.exports = authRouter;