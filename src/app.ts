import express, { Application } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import methodOverride from 'method-override';

function loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
}

class App {
    public app: Application;
    public port: number;

    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        // this.app.use(
        //     session({
        //         secret: process.env.SECRET,
        //         resave: false,
        //         saveUninitialized: false
        //     }));
        // this.app.use(methodOverride('_method'));
        this.app.use(loggerMiddleware);
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server is listening on port: ${this.port}`)
        })
    }
}

export default App;