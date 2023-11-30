const { Worker } = require("worker_threads");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

var socketio_port = "33334";

//Express webserver
http.listen(socketio_port, function () {
  console.log("listening on *:" + socketio_port);
});

const kafkaTopics = [
  "TRUCK-SENSORS",
  "TRUCK-1-SENSORS",
  "TRUCK-2-SENSORS",
  "TRUCK-3-SENSORS",
]; // Add your Kafka topics here

for (const topic of kafkaTopics) {
  const worker = new Worker("./kafkaConsumerWorker.js", {
    workerData: { topic },
  });

  worker.on("message", ({ topic, message }) => {
    io.emit(topic, message);
  });
}
