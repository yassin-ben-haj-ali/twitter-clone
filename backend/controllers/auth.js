import authServices from "../services/auth.js";

export const signup = async (req, res) => {
    const { fullName, username, email, password } = req.body;
    const user = await authServices.signup({ fullName, username, email, password });
    const { token, ...data } = user;
    res.cookie("jwt", token, {
        maxAge: 8 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
    res.json({ token, data })
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await authServices.login({ username, password });
    const { token, ...data } = user;
    res.cookie("jwt", token, {
        maxAge: 8 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
    res.json({ token, data })
}

export const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 }).json({ message: "Logged out successfully" })
}

export const getMe = async (req, res) => {
    const user = await authServices.getMe(req.user._id);
    res.json(user);
}