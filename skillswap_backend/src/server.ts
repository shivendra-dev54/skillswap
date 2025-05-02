import app from "./app";
require("dotenv").config();

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("starting app...")
    console.log(`app is running on port ${PORT}...`)
})