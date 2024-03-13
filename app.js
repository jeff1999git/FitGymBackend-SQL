const express = require("express")

const adminRouter = require("./controllers/adminRouter")

const app = express()
const port = 3000;

app.use(express.json())




app.use("/api/admin", adminRouter)

app.listen(port, () => {
    console.log("Server Running")
})
