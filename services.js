let fs = require('fs')
let url = require('url')
let http = require('https')
let path = require('path')



exports.callWeather = (req, res) =>{
	res.setHeader('Content-Type', 'application/json')
	const reqUrl = url.parse(req.url, true)
    if (!reqUrl.query.region) {
        res.end(JSON.stringify({
            'message':'invalid query passed'
        }))
        return 
	}

    let region = reqUrl.query.region
	http.get(`https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=ee2587a9faedc246c344b5460aa41b86`, (resp)=>{
		resp.setEncoding('utf-8')
		let body = ''
		resp.on('data', (data)=>{
			body += data
		})

		resp.on('end', ()=>{
			body = JSON.parse(body);
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.end(JSON.stringify({
				'status':'success',
				'data' : body
			}))
			// console.log(body)
		})
	}).on('error', err=>{
			res.end(JSON.stringify({
			'status':'success',
			'data' : err
		}))
	})
}

exports.defaultView = (req, res)=>{
	let file = '.' + req.url
	if (file == './') file = './index.html'
	let extention = String(path.extname(file)).toLowerCase()
	let mime = {
		'.html' : 'text/html',
		'.css' : 'text/css',
		'.json' : 'application/json',
		'.js' : 'application/javascript',
		'.png' : 'image/png',
		'.gif' : 'image/gif',
		'.jpg' : 'image/jpg',
	}
	let type = mime[extention] || 'application/octet-stream'
	

	fs.readFile(file, (err, data)=>{
		if (err) {
			if (err.code == 'ENOENT') {
				fs.readFile('./404.html', (err, content) =>{
					res.writeHead(200, {'Content-Type': type})
					res.end(content, 'utf-8')
					return
				})
			}
			res.writeHead(500)
			res.end('Error: ' + err.code + '\n')
			res.end()
			return
		}
		res.writeHead(200, {'Content-Type' : type})
		res.end(data, 'utf-8')
	})
}
