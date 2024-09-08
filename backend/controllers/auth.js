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
        res.json({token,data})
    } catch (error) {
        next(error);
    }

}

export const login = (req, res) => {
    const user = authServices.login();
    res.json(user);
}

export const logout = (req, res) => {
    const user = authServices.logout();
    res.json(user);
}