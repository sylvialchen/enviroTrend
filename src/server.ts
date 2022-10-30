import App from './app';
import 'dotenv/config';
import mongoose from 'mongoose';
// const PORT = process.env.PORT;
import UsersController from './users/users.controller';
import SessionsController from './sessions/sessions.controller';


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
		new SessionsController(),
	],
	5050
);

app.listen()













