const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: ["localhost:29092"],
  clientId: "example-consumer",
});

const createConsumer = (topic) => {
  // Define the Kafka Consumer properties
  const consumer = kafka.consumer({ groupId: topic, fromOffset: 0 });

  return consumer;
};

const runConsumer = async (topic, onMessage) => {
  try {
    const consumer = createConsumer(topic);

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        var msg = {
          partition,
          offset: message.offset,
          value: message.value.toString(),
        };
        onMessage({ topic, partition, msg });
      },
    });
  } catch (err) {
    console.error(`Error connecting to Kafka: ${error.message}`);
  }

  const errorTypes = ["unhandledRejection", "uncaughtException"];
  const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

  errorTypes.forEach((type) => {
    process.on(type, async (e) => {
      try {
        console.log(`process.on ${type}`);
        console.error(e);
        await consumer.disconnect();
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signalTraps.forEach((type) => {
    process.once(type, async () => {
      try {
        await consumer.disconnect();
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
};

module.exports = { runConsumer };
