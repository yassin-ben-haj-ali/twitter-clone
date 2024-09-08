import authServices from "../services/auth.js";

export const signup = async (req, res, next) => {
    const { fullName, username, email, password } = req.body;
    try {
        const user = await authServices.signup({ fullName, username, email, password });
        const { token, ...data } = user;
        res.cookie("jwt", token, {
            maxAge: 8 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        });
        res.json({ token, data })
    } catch (error) {
        next(error);
    }

}

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await authServices.login({ username, password });
        const { token, ...data } = user;
        res.cookie("jwt", token, {
            maxAge: 8 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        });
        res.json({ token, data })
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }).json({ message: "Logged out successfully" })
    } catch (error) {
        next(error)
    }
}