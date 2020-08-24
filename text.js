let button = document.getElementById('button').addEventListener('click', ()=>{
	let city = document.getElementById('city').value
	fetch(`/call/weather?region=${city}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then(res => res.json())
	.then(data => {
		let result = data['data']
		// <img src=" http://openweathermap.org/img/wn/10d@2x.png" alt="" srcset="">
		//  http://openweathermap.org/img/wn/10d@2x.png
		document.getElementById('temp').innerText = Math.floor((+result.main.temp - 32) * 5/9) + '°C'
		document.getElementById('icon').innerHTML = ` <img src=" http://openweathermap.org/img/wn/${result.weather[0].icon}.png" alt="" srcset="">`
		document.getElementById('region').innerText = result.name 
		document.getElementById('country').innerText = result.sys.country 
		document.getElementById('status').innerText = result.weather[0].main + ' | '
		document.getElementById('time').innerText = new Date().toDateString()
		console.log(result)
	})
	.catch(err => console.log(err))
})