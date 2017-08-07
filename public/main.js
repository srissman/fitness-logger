var update = document.getElementById('update')

update.addEventListener('click', function () {
  fetch('names', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      oldFirstName: oldFirstName,
      newFirstName: newFirstName,
      newLastName: newLastName
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.href = '/home';
  })
})