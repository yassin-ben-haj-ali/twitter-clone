import User from "../models/user.js"
import { AlreadyExistError, BadRequestError } from "../utils/appErrors.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"
const signup = async ({ fullName, username, email, password }) => {

    const exisingUser = await User.findOne({ username })
    if (exisingUser) {
        throw new AlreadyExistError("Username is already taken")
    }
    const exisingEmail = await User.findOne({ email })
    if (exisingEmail) {
        throw new AlreadyExistError("email is already taken")
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullName,
        username,
        email,
        password: hashedPassword
    })

    await newUser.save();
    const token = generateToken({ userId: newUser._id });
    return { ...newUser._doc, password: "", token };
}

const login = async ({ username, password }) => {

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
        throw new BadRequestError("Invalid username or Password")
    }
    const token=generateToken({userId:user._id});
    return {
        ...user._doc,
        password:"",
        token
    }


}


const authServices = { signup, login }

export default authServices;