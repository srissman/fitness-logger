var mongoose require('mongoose ');

var userNamesSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true,
		lowercase: true
	},
	lastName: {
		type: String,
		required: true,
		lowercase: true
	},
	email: {
		type: String,
		required: true
	}
})
mongoose.model('userNames', userNamesSchema);