import express, { NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import AppConstants from "./constants/app_constants";
import { HttpStatusCodes } from "./constants/http_status_code";
import customResponse from "./middleware/custom_responses";
import cors from "cors";

const PORT = AppConstants.port
const app = express();
app.use(cors({ origin: "*" }));
app.use(customResponse);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("json replacer", function (key: unknown, value: unknown) {
  if (typeof value === "undefined") {
      return null;
  }
  return value;
});

app.use("*", function (req, res) {
    res.status(404).json({
        success: false,
        error: "Page not found",
    });
});


app.use(async (err: any, req: any, res: any, next: NextFunction) => {
    err.statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER;
    const className = err.constructor.name;

    if (className === "BaseError") {
        res.customizedOutPut(err);
    } else {
        if (err.name === "ValidationError") {
            res.validationError({ err, message: err.message });
        } else if (err.code === 11000) {
            res.validationError({
                message:
                    "Cannot Create Duplicate Document With " +
                    Object.keys(err.keyValue),
            });
        } else {
            if (err.statusCode !== 500) {
                res.customizedOutPut(err);
            } else {
                res.serverError({ message: err.message });
            }
        }
    }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


