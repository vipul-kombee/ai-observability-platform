# AI Observability Platform

## Stack

Grafana
Prometheus
Loki
Tempo
Pyroscope
k6
Node Sample App

## Start Platform

docker-compose up -d

## Access

Grafana
http://localhost:3000

Prometheus
http://localhost:9090

Sample App
http://localhost:3001

## Load Testing

k6 run load-testing/k6-load-test.js