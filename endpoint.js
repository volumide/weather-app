let http = require('https')

let country = 'London'
http.get(`https://api.openweathermap.org/data/2.5/weather?q=${country},uk&appid=ee2587a9faedc246c344b5460aa41b86`, (res)=>{
	res.setEncoding('utf-8')
	let body = ''
	res.on('data', (data)=>{
		body += data
	})

	res.on('end', ()=>{
		body = JSON.parse(body);
		console.log(body)
	})
}).on('error', err=>{
		console.log(err)
})
