const express = require("express");
const axios = require("axios");
const dapr = require("@dapr/dapr");
const app = express();

const client = new dapr.DaprClient(
  "127.0.0.1",
  "3500",
  dapr.CommunicationProtocolEnum.HTTP
);
app.get("/notify", async (req, res) => {
  //make call to /user in user service to get user information
  // const { data } = await axios.get(
  //   "http://localhost:3502/v1.0/invoke/user-service/method/user"
  // );

  const data = await client.invoker.invoke("user-service", "user");
  res.send(`Notification send to ${data.name} through email :${data.email}`);
});
app.listen("4002", () => {
  console.log("SERVER STARTED ");
});
