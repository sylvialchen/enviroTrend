// Dependencies
import express from 'express';
import Controller from '../interfaces/controller.interface';
import bcrypt from 'bcrypt';
// import User from '../users/users.interface';
import userModel from '../users/user.model';
import fetch from 'node-fetch';


export interface MyContext {
    req: Request & { session: Express.Session };
    res: Response;
}


class SessionsController implements Controller {
    public path = '/sessions';
    public router = express.Router();
    // private user = userModel
    private weatherAPI1 = `https://api.openweathermap.org/data/2.5/weather?q=`
    private weatherAPI2 = `&appid=fcb18c82fe8c42a3603ffbe6309ec28f`

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.newLoginPage);
        this.router.delete(this.path, this.logoutRoute);
        this.router.post(this.path, this.newLoginRoute);
        this.router.post(`${this.path}/addBadDay`, this.addBadDay);
    }

    private newLoginPage(req: express.Request, res: express.Response) {
        res.render('../views/sessions/new.ejs', {
            currentUser: req.session.currentUser
        })
    };

    private logoutRoute(req: express.Request, res: express.Response) {
        req.session.destroy((error) => {
            res.redirect('./')
        })
    };
    // ****** from wanago.io tutorial:
    // https://wanago.io/2020/04/27/typescript-express-put-vs-patch-mongodb-mongoose/
    // private modifyPost = async (request: Request, response: Response, next: NextFunction) => {
    //     const id = request.params.id;
    //     const postData: Post = request.body;
    //     const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
    //     if (post) {
    //       response.send(post);
    //     } else {
    //       next(new PostNotFoundException(id));
    //     }
    //   }


    private addBadDay = async (req: express.Request, res: express.Response) => {
        // console.log(req.body.city);
        const city: string = req.body.city;
        await fetch(`${this.weatherAPI1}${city}${this.weatherAPI2}`)
            .then(res => res.json())
            .then(res => {
                let data: object = res
                // console.log(data);
                // console.log(req.session.currentUser._id)
                userModel.findByIdAndUpdate(req.session.currentUser._id,
                    { new: true },
                    (error, updatedUser) => {
                        updatedUser.savedBadDays.push(data)
                        updatedUser.save();
                    }
                )
            })
        res.redirect('/')
    };


    private newLoginRoute(req: express.Request, res: express.Response) {
        userModel.findOne({
            email: req.body.email
        }).then((foundUser) => {
            if (!foundUser) {
                res.send(`Oops! No user with that email address has been registered.`);
            } else {
                const passwordMatches: Boolean = bcrypt.compareSync(req.body.password, foundUser.password);
                if (passwordMatches) {
                    req.session.currentUser = foundUser;
                    res.redirect('./');
                } else {
                    res.send('Oops! Invalid credentials.');
                }
            }
        })
    };

};


// Export User Router
export default SessionsController;








