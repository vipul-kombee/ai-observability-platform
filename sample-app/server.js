const express = require("express")
require("./telemetry")

const app = express()

app.get("/",(req,res)=>{

res.send("Observability Demo Running")

})

app.get("/api",(req,res)=>{

const delay = Math.random()*500

setTimeout(()=>{

res.json({
status:"success",
delay:delay
})

},delay)

})

app.get("/error",(req,res)=>{

res.status(500).send("error")

})

app.listen(3001,()=>{

console.log("server running")

}) 