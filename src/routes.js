const { Router } = require("express");
const {
  getEventsReq,
  getEventDetailsReq,
  getUserNameReq,
  getUserExpensesReq,
  getInvitedUsersReq,
  loginAuthReq,
} = require("./controllers/retrieveDataReq");

// const { updateStudentStatusReq } = require("./controllers/updateDataReq");
const routes = new Router();

// routes.get("/getstudents", retrieveStudentsReq);

//GET
routes.get("/getevents", getEventsReq);
routes.get("/geteventdetails", getEventDetailsReq);
routes.get("/getuserfullname", getUserNameReq);
routes.get("/getuserexpenses", getUserExpensesReq);
routes.get("/getinvitedusers", getInvitedUsersReq);
routes.get("/loginauth", loginAuthReq);

//POST

//DELETE

//PUT

module.exports = routes;
