import User from "../models/user.js"
import { AlreadyExistError } from "../utils/appErrors.js"
import bcrypt from "bcryptjs"
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
    return {...newUser._doc,password:""};
}

const login = () => {

    return { data: "you hit the login endpoint" }

}

const logout = () => {

    return { data: "you hit the logout endpoint" }

}

const authServices = { signup, login, logout }

export default authServices;