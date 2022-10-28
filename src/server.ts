import App from './app';
import 'dotenv/config';
import mongoose from 'mongoose';
const PORT = process.env.PORT;
import UsersController from './users/users.controller';


// Database Configuration
mongoose.connect(process.env.DATABASE_URL
	// 	, {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true
	// }
);

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

const app = new App(
	[
		new UsersController(),
	],
	5050
);

app.listen()










// // Routes / Controllers
// const userController = require('./controllers/users');
// app.use('/users', userController);
// const sessionsController = require('./controllers/sessions');
// app.use('/sessions', sessionsController);
// app.get('/', (req, res) => {
// 	if (req.session.currentUser) {
// 		res.render('dashboard.ejs', {
// 			currentUser: req.session.currentUser
// 		});
// 	} else {
// 		res.render('index.ejs', {
// 			currentUser: req.session.currentUser
// 		});
// 	}
// });

