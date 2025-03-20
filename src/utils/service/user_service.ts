import jwt from "jsonwebtoken";
import { UserTypes } from "../types/user_types";
import AppConstants from "../../constants/app_constants";

export const createJwtToken = async (user: UserTypes) => {
    try {
        const token = jwt.sign(
            { id: user.id, email: user.email },
            AppConstants.jwtSecret,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        return token
    } catch (error) {
        throw error
    }
};