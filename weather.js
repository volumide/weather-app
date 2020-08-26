
document.getElementById('time').innerText = new Date().toDateString()


let button = document.getElementById('button').addEventListener('click', ()=>{
	let city = document.getElementById('city').value
	weather(city)
})

function weather(location = 'Lagos'){
	fetch(`/call/weather?region=${location}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then(res => res.json())
	.then(data => {
		let result = data['data']
		document.getElementById('temp').innerHTML = Math.floor(+result.main.temp -  273.15) + '<span>°C </span>'
		document.getElementById('icon').innerHTML = `<img src=" https://openweathermap.org/img/wn/${result.weather[0].icon}.png" alt="" srcset="">`
		document.getElementById('region').innerText = result.name 
		document.getElementById('country').innerText = result.sys.country
		document.getElementById('status').innerText = result.weather[0].main 
	})
	.catch(err => console.log(err))
}

weather()

// window.onload = function(){
// 	weather()
// }