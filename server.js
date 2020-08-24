
const server = require('./controller')

server.listen(8000, '127.0.0.1', ()=>{
	console.log('server running at http://127.0.0.1:8000/')
})