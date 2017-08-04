const express = require('express');
const app = express();

app.listen(3000, function() {
	console.log('listening on 3000')
});


// READ
app.get('/', (req, res) => {
	// do something
	res.sendFile(__dirname + '/index.html');
})

// CREATE
