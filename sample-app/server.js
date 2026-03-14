require("./tracing");
const express = require("express");
const promClient = require("prom-client");

const app = express();
const port = 3001;

/* -------------------------
   PROMETHEUS METRICS
------------------------- */

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsTotal);

/* -------------------------
   API ENDPOINT
------------------------- */

app.get("/api", async (req, res) => {

  const delay = Math.random() * 500;

  await new Promise(r => setTimeout(r, delay));

  httpRequestsTotal.labels("GET", "/api", "200").inc();

  console.log(`API request processed in ${delay} ms`);

  res.json({
    status: "success",
    delay
  });

});

/* -------------------------
   PROMETHEUS METRICS
------------------------- */

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});