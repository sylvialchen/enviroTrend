// const express = require('express');
import express from 'express';
// const bcrypt = require('bcrypt');
import Controller from '../interfaces/controller.interface';
import bcrypt from 'bcrypt';
// const userRouter = express.Router();
// const User = require('../users/user.model.ts');
import User from './users.interface';
import userModel from './user.model';

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
        res.send("Hello Typescript")
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

