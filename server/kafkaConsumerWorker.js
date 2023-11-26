const { workerData, parentPort, threadId } = require("worker_threads");
const { runConsumer } = require("./kafkaConsumer");

const { topic } = workerData;

console.log(
  `Worker thread for topic ${topic} is running on thread ID: ${threadId}`
);

runConsumer(topic, (message) => {
  parentPort.postMessage({ topic, message });
});
