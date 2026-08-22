import {Request, Response} from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController{
    static ragister = async (req: Request, res:Response) => {
        const {email, password, fullName} = req.body;

        const result = await authService.register(
            email,
            password,
            fullName,
        );

        return res.status(201).json({
            user:{
                id: result.user.id,
                email: result.user.email,
                fullName: result.user.fullName,

            },
            token: result.token
        });
    };

    static login = async (req: Request, res:Response) => {
        const {email, password} = req.body;

        const result = await authService.login(
            email,
            password,
        );

        return res.status(200).json({
            user:{
                id:result.user.id,
                email: result.user.email,
                fullName: result.user.fullName,
            },
            token: result.token,
        });
    }

}