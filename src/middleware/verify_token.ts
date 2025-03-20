import jwt from "jsonwebtoken";
import { dataReturnOnlyIfUserExist } from "../service/user_service";
import errorResponse from "../utils/errors/errorResponse";

export const auth = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}
		if (!token) {
			return next(
				errorResponse.Api401Error({
					errorDescription: "authorization is required in header",
				})
			);
		}

		const decoded = jwt.verify(token, "abcd1234");
		const user = await dataReturnOnlyIfUserExist({
			userId: decoded.id,
		});

		req.userId = user.id;
		next();

	} catch (error) {
		next(error);
	}
};
