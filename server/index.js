const app  = require("./dist/app/app.bundle")
const port = process.env.PORT || 1000;

app.default.listen(port, ()=>{
    console.log(`Server started and running on http://localhost:${port}`)
})
