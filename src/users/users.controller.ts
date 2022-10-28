import express from 'express';
import Controller from '../interfaces/controller.interface';
import bcrypt from 'bcrypt';
import User from './users.interface';
import userModel from './user.model';
// import session from 'express-session';


export interface MyContext {
    req: Request & { session: Express.Session };
    res: Response;
}

// declare module session {
//     interface SessionData {
//         user: User;
//     }
// }

class UsersController implements Controller {
    public path = '/users';
    public router = express.Router();
    private user = userModel

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getNewRegistration);
        this.router.post(this.path, this.createNewUser)
    }


    // New (registration page)
    // userRouter.get('/new', (req, res) => {
    //     res.render('users/new.ejs', {
    //         currentUser: req.session.currentUser
    //     });
    // });
    private getNewRegistration(req: express.Request, res: express.Response) {
        res.render('../views/users/new.ejs', {
            currentUser: req.session.currentUser
        })
    };

    // Create (registration route)
    // userRouter.post('/', (req, res) => {
    // overwrite the user password with the hashed password, then pass that in to our database
    //     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    //     User.create(req.body, (error, createdUser) => {
    //         res.redirect('/');
    //     });
    // })   
    private createNewUser(req: express.Request, res: express.Response) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        const userData: User = req.body;
        const createdUser = new userModel(userData);
        createdUser.save()
            .then(savedUser => {
                res.send(savedUser);
            })
    }

}


// Export User Router
export default UsersController;

