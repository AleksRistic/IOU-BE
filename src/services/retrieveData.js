// Return the ids of events a given user is invited to.
async function getEventIds(userID, connection) {
  try {
    const eventIds =
      await connection.query`SELECT event_id FROM user_has_event WHERE user_id = ${userID}`;

    return eventIds.recordset;
  } catch (err) {
    console.error(err);
  }
}

// Return the events a given user is invited to.
async function getEvents(eventId, connection) {
  try {
    const events =
      await connection.query`SELECT * FROM events WHERE event_id = ${eventId}`;

    return events.recordset;
  } catch (err) {
    console.error(err);
  }
}

async function getEventDetails(eventID, connection) {
  try {
    const eventDetails =
      await connection.query`SELECT * FROM event_detail WHERE event_id = ${eventID}`;

    return eventDetails.recordset;
  } catch (err) {
    console.error(err);
  }
}

async function getUserName(userID, connection) {
  try {
    const userName =
      await connection.query`SELECT user_first_name, user_last_name FROM users WHERE user_id = ${userID}`;

    const recordset = userName.recordset[0];

    const fullName = `${recordset.user_first_name} ${recordset.user_last_name}`;

    return fullName;
  } catch (err) {
    console.error(err);
  }
}

// get a users expenses for a particular event by passing in a non-zero event ID,
// if the eventID is 0, it will return all of a users expenses
async function getUserExpenses(userID, eventID, connection) {
  try {
    let sql =
      eventID === "0"
        ? `SELECT * FROM user_expenses WHERE user_id = ${userID}`
        : `SELECT * FROM user_expenses WHERE user_id = ${userID} AND event_id = ${eventID}`;

    const userExpenses = await connection.query(sql);

    return userExpenses.recordset;
  } catch (err) {
    console.error(err);
  }
}

async function getInvitedUsers(eventID, connection) {
  try {
    const invitedUsers =
      await connection.query`SELECT * FROM user_has_event WHERE event_id = ${eventID} ORDER BY status_id DESC`;

    return invitedUsers.recordset;
  } catch (err) {
    console.error(err);
  }
}

async function loginAuth(username, password, connection) {
  try {
    const userID =
      await connection.query`SELECT user_id FROM login WHERE username=${username} AND password=${password}`;

    return userID.recordset.length !== 0 ? userID.recordset : 0;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getEventIds,
  getEvents,
  getEventDetails,
  getUserName,
  getUserExpenses,
  getInvitedUsers,
  loginAuth,
};
