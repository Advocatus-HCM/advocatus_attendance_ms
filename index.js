import app from './bootstrap.js'
const port = 8001

await app.init()

app.express.listen(port, () => console.log(`App listening on port ${port}!`))