
const server = require('./controller')
let port = process.env.PORT || 8000
server.listen(port, ()=>{
	console.log('server running at http://127.0.0.1:8000/')
})