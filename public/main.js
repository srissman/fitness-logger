var update = document.getElementById('update');

update.addEventListener('click', function () {
	  fetch('update', {
	  method: 'put',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
	  	'oldFirstName': oldFirstName
	    'newFirstName' : newFirstName,
	    'newLastName' : newLastName
	  })
	})
	.then(res => {
	  if (res.ok) return res.json()
	})
	.then(data => {
	  console.log(data)
	  window.location.redirect('/home');
	})
});