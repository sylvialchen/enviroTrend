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
        this.router.get(this.path, this.getNewRegistration)
    }


    // New (registration page)
    // userRouter.get('/new', (req, res) => {
    //     res.render('users/new.ejs', {
    //         currentUser: req.session.currentUser
    //     });
    // });
    private getNewRegistration(request: express.Request, response: express.Response) {
        response.send("Hello Typescript")
    };

    // Create (registration route)
    // userRouter.post('/', (req, res) => {
    // overwrite the user password with the hashed password, then pass that in to our database
    //     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    //     User.create(req.body, (error, createdUser) => {
    //         res.redirect('/');
    //     });
    // })   

}


// Export User Router
export default UsersController;

