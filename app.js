const express = require("express")

const adminRouter = require("./controllers/adminRouter")

const memberRouter = require("./controllers/memberRouter")

const packageRouter = require("./controllers/packageRouter")


const app = express()
const port = 3000;

app.use(express.json())




app.use("/api/admin", adminRouter)

app.use("/api/member", memberRouter)

app.use("/api/package", packageRouter)


app.listen(port, () => {
    console.log("Server Running")
})
