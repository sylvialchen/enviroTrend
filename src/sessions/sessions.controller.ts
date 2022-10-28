// Dependencies
import express from 'express';
import Controller from '../interfaces/controller.interface';
import bcrypt from 'bcrypt';
import User from '../users/users.interface';
import userModel from '../users/user.model';

// export interface MyContext {
//     req: Request & { session: Express.Session };
//     res: Response;
// }

class SessionsController implements Controller {
    public path = '/sessions';
    public router = express.Router();
    private user = userModel

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.newLoginPage);
        this.router.delete(this.path, this.logoutRoute);
        this.router.post(this.path, this.newLoginRoute)
    }

    // // New (login page)
    // sessionsRouter.get('/new', (req, res) => {
    //     res.render('sessions/new.ejs', {
    //         currentUser: req.session.currentUser
    //     });
    // });

    private newLoginPage(req: express.Request, res: express.Response) {
        res.render('../views/sessions/new.ejs', {
            currentUser: req.session.currentUser
        })
    };

    // // Delete (logout route)
    // sessionsRouter.delete('/', (req, res) => {
    //     req.session.destroy((error) => {
    //         res.redirect('/');
    //     });
    // });   

    private logoutRoute(req: express.Request, res: express.Response) {
        req.session.destroy((error) => {
            res.redirect('/')
        })
    }

    // // Create (login route)
    // sessionsRouter.post('/', (req, res) => {
    //     // Check for an existing user
    //     User.findOne({
    //         email: req.body.email
    //     }, (error, foundUser) => {
    //         // send error message if no user is found
    //         if (!foundUser) {
    //             res.send(`Oops! No user with that email address has been registered.`);
    //         } else {
    //             // If a user has been found 
    //             // compare the given password with the hashed password we have stored
    //             const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

    //             // if the passwords match
    //             if (passwordMatches) {
    //                 // add the user to our session
    //                 req.session.currentUser = foundUser;

    //                 // redirect back to our home page
    //                 res.redirect('/');
    //             } else {
    //                 // if the passwords don't match
    //                 res.send('Oops! Invalid credentials.');
    //             }
    //         }
    //     });
    // });

    private newLoginRoute(req: express.Request, res: express.Response) {
        console.log(req)
        res.send("wtf")
        // this.user.findOne({
        //     email: req.body.email
        // }, (error, foundUser) => {
        //     // send error message if no user is found
        //     if (!foundUser) {
        //         res.send(`Oops! No user with that email address has been registered.`);
        //     } else {
        //         // If a user has been found 
        //         // compare the given password with the hashed password we have stored
        //         const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);

        //         // if the passwords match
        //         if (passwordMatches) {
        //             // add the user to our session
        //             req.session.currentUser = foundUser;
        //             console.log("here!")

        //             // redirect back to our home page
        //             res.redirect('/');
        //         } else {
        //             // if the passwords don't match
        //             res.send('Oops! Invalid credentials.');
        //         }
        //     }
        // });
    }
};


// Export User Router
export default SessionsController;








