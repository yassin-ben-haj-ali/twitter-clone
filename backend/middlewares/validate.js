import validator from "../utils/validator/index.js";
import { BadRequestError } from "../utils/appErrors.js"


const validateMiddleware = (schema) => {
    const validate = validator(schema);
    return async (req, res, next) => {
        try {
            await validate(req.body);
            next();
        } catch (error) {
            next(new BadRequestError(error.errors, error.errors));
        }
    };
};

export default validateMiddleware