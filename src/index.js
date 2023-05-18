import app from "./app" 

app.listen(app.get('port'))


var cors = require('cors')

app.use(cors()) 

console.log("server on port", app.get('port'))

