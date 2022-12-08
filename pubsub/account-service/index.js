const express = require("express");
const dapr = require("@dapr/dapr");
const app = express();

app.use(express.json());
const client = new dapr.DaprClient(
  "127.0.0.1",
  "3500",
  dapr.CommunicationProtocolEnum.HTTP
);

const pubSubName = "pubsub";
//THIS METHOD TAKE USER AND AFTER CREATING USER IT WILL PUBLISH MESSAGE
app.post("/create", async (req, res) => {
  const topic = "create-user";
  const userId = Math.floor(Math.random() * 100);
  const message = {
    userId,
    name: req.body.name,
    email: req.body.email,
  };
  // Publish Message to Topic :: THIS MESSAGE WILL BE CONSUMED[SUBSCRIBED] IN EMAIL SERVICE
  await client.pubsub.publish(pubSubName, topic, message);
  res.send(message);
});

app.listen("4000", () => {
  console.log("SERVER STARTED ");
});
