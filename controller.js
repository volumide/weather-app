const http = require('http');
const url = require('url');
// const http = require('https')

var server = require('./services')
module.exports = http.createServer((req,res)=>{
	const reqUrl = url.parse(req.url, true)
	if (reqUrl.pathname == '/call/weather' && req.method == 'GET') {
		server.callWeather(req, res)
		return
	}

	server.defaultView(req, res)
})