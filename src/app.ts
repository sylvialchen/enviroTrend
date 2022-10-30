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
    public path = '';

    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeControllers(controllers);
    }
    private initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded(
            { extended: true }
        ));
        this.app.use(
            session({
                secret: process.env.SECRET,
                resave: false,
                saveUninitialized: false
            }));
        this.app.use(methodOverride('_method'));
        this.app.use(loggerMiddleware);
        this.app.use('/', express.static('Public'))
    }

    private initializeRoutes() {
        this.app.get(this.path, this.homepage);

    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }


    private homepage(req: express.Request, res: express.Response) {
        console.log("here")
        if (req.session.currentUser) {
            res.render('dashboard.ejs', {
                currentUser: req.session.currentUser
            });
        } else {
            res.render('index.ejs', {
                currentUser: req.session.currentUser
            });
        }
    };


    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server is listening on port: ${this.port}`)
        })
    }
}

export default App;
