const express = require("express")

const adminRouter = require("./controllers/adminRouter")
const memberRouter = require("./controllers/memberRouter")

const app = express()
const port = 3000;

app.use(express.json())




app.use("/api/admin", adminRouter)
app.use("/api/member", memberRouter)

app.listen(port, () => {
    console.log("Server Running")
})
