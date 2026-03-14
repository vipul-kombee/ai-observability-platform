import http from "k6/http";
import { check, sleep } from "k6";

export const options = {

  stages: [
    { duration: "20s", target: 50 },   // ramp up
    { duration: "20s", target: 150 },  // increase load
    { duration: "20s", target: 300 },  // peak load
    { duration: "10s", target: 0 }     // ramp down
  ],

  thresholds: {
    http_req_duration: ["p(95)<800"], 
    http_req_failed: ["rate<0.05"]
  }
};

export default function () {

  const res = http.get("http://localhost:3001/api");

  check(res, {
    "status is 200": (r) => r.status === 200
  });

  sleep(1);
}