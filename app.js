const express = require("express")

const adminRouter = require("./controllers/adminRouter")
const trainerRouter = require("./controllers/trainerRouter")

const app = express()
const port = 3000;

app.use(express.json())




app.use("/api/admin", adminRouter)
app.use("/api/trainer", trainerRouter)

app.listen(port, () => {
    console.log("Server Running")
})
