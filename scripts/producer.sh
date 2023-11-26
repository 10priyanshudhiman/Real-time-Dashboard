
kafka-producer-perf-test \
    --topic TRUCK-SENSORS \
    --throughput 1 \
    --producer-props bootstrap.servers=localhost:29092 \
    --payload-file ../data/truck_engine_sensors.json \
    --num-records 1000 
