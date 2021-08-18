const { getConnection } = require("../db/dbconnect");
const {
  getEventIds,
  getEvents,
  getEventDetails,
  getUserName,
  getUserExpenses,
  getInvitedUsers,
  loginAuth,
} = require("../services/retrieveData");

async function getEventsReq(req, res) {
  try {
    const { userID } = req.query;
    const connection = await getConnection();

    const eventIds = await getEventIds(userID, connection);

    const temp = [];
    for (let id = 0; id < eventIds.length; id++) {
      const event = await getEvents(eventIds[id].event_id, connection);
      console.log(event[0]);
      temp.push(event[0]);
    }

    let events = {};
    events = temp;
    console.log(events);

    connection.close();
    console.log("Connection Closed");
    return res.json(events);
  } catch (err) {
    console.error(err);
  }
}

async function getUserNameReq(req, res) {
  try {
    const { userID } = req.query;
    const connection = await getConnection();

    const userFullName = await getUserName(userID, connection);

    connection.close();
    console.log("Connection Closed");

    return res.json(userFullName);
  } catch (err) {
    console.error(err);
  }
}

async function getEventDetailsReq(req, res) {
  try {
    const { eventID } = req.query;
    const connection = await getConnection();

    // get the event details
    const eventDetails = await getEventDetails(eventID, connection);

    connection.close();
    console.log("Connection Closed");

    return res.json(eventDetails);
  } catch (err) {
    console.error(err);
  }
}

async function getUserExpensesReq(req, res) {
  try {
    const { userID, eventID } = req.query;
    const connection = await getConnection();

    // get event expenses
    const eventDetails = await getUserExpenses(userID, eventID, connection);

    connection.close();
    console.log("Connection Closed");

    return res.json(eventDetails);
  } catch (err) {
    console.error(err);
  }
}

async function getInvitedUsersReq(req, res) {
  try {
    const { eventID } = req.query;

    const connection = await getConnection();

    const invitedUsers = await getInvitedUsers(eventID, connection);

    connection.close();
    console.log("Connection Closed");

    return res.json(invitedUsers);
  } catch (err) {
    console.error(err);
  }
}

async function loginAuthReq(req, res) {
  try {
    const { username, password } = req.query;
    console.log({ username, password });

    const connection = await getConnection();

    const userID = await loginAuth(username, password, connection);

    connection.close();
    console.log("Connection Closed");

    return res.json(userID);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getEventsReq,
  getEventDetailsReq,
  getUserNameReq,
  getUserExpensesReq,
  getInvitedUsersReq,
  loginAuthReq,
};
