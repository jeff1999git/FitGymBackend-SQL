const express = require("express")

const adminRouter = require("./controllers/adminRouter")
const trainerRouter = require("./controllers/trainerRouter")
const memberRouter = require("./controllers/memberRouter")
const packageRouter = require("./controllers/packageRouter")
const paymentRouter = require("./controllers/paymentRouter")
const subscriptionRouter = require("./controllers/subscriptionRouter")


const app = express()
const port = 3000;

app.use(express.json())




app.use("/api/admin", adminRouter)
app.use("/api/trainer", trainerRouter)

app.use("/api/member", memberRouter)

app.use("/api/package", packageRouter)

app.use("/api/payment", paymentRouter)

app.use("/api/subs", subscriptionRouter)


app.listen(port, () => {
    console.log("Server Running")
})
