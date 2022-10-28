// const express = require('express');
import * as express from 'express';
// const bcrypt = require('bcrypt');
import Controller from '../interfaces/controller.interface';
import * as bcrypt from 'bcrypt';
// const userRouter = express.Router();

const User = require('../models/user.model.ts/index.js');


class UsersController implements Controller {
    public path = '/users';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/new', this.newRegistration)
        this.router.post('/new', this.createRegistration)
    }


    // New (registration page)
    // userRouter.get('/new', (req, res) => {
    //     res.render('users/new.ejs', {
    //         currentUser: req.session.currentUser
    //     });
    // });
    private newRegistration(request: express.Request, response: express.Response) {
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
    private createRegistration(request: express.Request, response: express.Response) {
        request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
        User.create(request.body, (error, createdUser) => {
            response.send('Surprise!');
        })
    };
}


// Export User Router
export default UsersController;

