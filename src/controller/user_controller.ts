import { loginSchema, signupSchema } from "../utils/validation/user_validation";
import { insertUser, matchUserAndGenerateJwtToken } from "../service/user_service";

async function user_signup(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await signupSchema.validateAsync(reqData);
        await insertUser(validatedData)

        res.dataUpdateSuccess({
            message: "Signup successfull",
        });
    } catch (error) {
        next(error);
    }
}

async function user_login(req, res, next) {
    try {
        const reqData = req.body;
        const validatedData = await loginSchema.validateAsync(reqData);
        const token = await matchUserAndGenerateJwtToken(validatedData)

        res.dataFetchSuccess({
            message: "Login successfull",
            data: token
        });
    } catch (error) {
        next(error);
    }
}

export { user_signup, user_login }