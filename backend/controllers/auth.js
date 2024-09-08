import authServices from "../services/auth.js";

export const signup = async (req, res, next) => {
    const { fullName, username, email, password } = req.body;
    try {
        const user = await authServices.signup({ fullName, username, email, password });
        res.json(user);
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