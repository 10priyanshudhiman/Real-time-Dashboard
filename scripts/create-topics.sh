echo "Waiting for Kafka to come online..."

cub kafka-ready -b kafka:9092 1 20

# create the users topic
kafka-topics \
  --bootstrap-server kafka:9092 \
  --topic TRUCK-1-SENSORS \
  --replication-factor 1 \
  --partitions 4 \
  --create

kafka-topics \
  --bootstrap-server kafka:9092 \
  --topic TRUCK-2-SENSORS \
  --replication-factor 1 \
  --partitions 4 \
  --create

kafka-topics \
  --bootstrap-server kafka:9092 \
  --topic TRUCK-3-SENSORS \
  --replication-factor 1 \
  --partitions 4 \
  --create

kafka-topics \
  --bootstrap-server kafka:9092 \
  --topic TRUCK-SENSORS \
  --replication-factor 1 \
  --partitions 4 \
  --create

sleep infinity
