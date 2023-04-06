import { ws, events } from "@ampt/sdk";

ws.on("connected", (connection) => {
  console.log(`new connection: ${connection.connectionId}`);
});

ws.on("disconnected", (connection) => {
  console.log(`connection closed: ${connection.connectionId}`);
});

type IncomingMessage = {
  task: "start";
};

ws.on<IncomingMessage>("message", async (connection, message) => {
  console.log(`message received: ${JSON.stringify(message)}`);
  if (await connection.isConnected()) {
    if (message?.task === "start") {
      await connection.send("Message Received");
      await events.publish("async-task-start", {
        connectionId: connection.connectionId,
      });
      await connection.send("Started Task");
    }
  } else {
    console.log(`Connection ${connection.connectionId} is no longer connected`);
  }
});

events.on("async-task-start", { timeout: 10000 }, async ({ body }) => {
  const { connectionId } = body;

  const startTime = Date.now();

  const isConnected = await ws.isConnected(connectionId);
  if (isConnected) {
    await ws.send(connectionId, "Received Task, doing async work...");

    await events.publish(
      "async-task-complete",
      {
        after: "1 seconds",
      },
      {
        connectionId,
        startTime,
      }
    );
  } else {
    console.error(`Connection ${connectionId} is no longer connected`);
  }
});

events.on("async-task-complete", async ({ body }) => {
  const { connectionId, startTime } = body;

  if (await ws.isConnected(connectionId)) {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    await ws.send(connectionId, `Task complete after ${duration}s`);
  } else {
    console.error(`Connection ${connectionId} is no longer connected`);
  }
});
