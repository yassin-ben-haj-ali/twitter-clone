import authServices from "../services/auth.js";

export const signup = (req, res) => {
    const user = authServices.signup();
    res.json(user);
}

export const login = (req, res) => {
    const user = authServices.login();
    res.json(user);
}

export const logout = (req, res) => {
    const user = authServices.logout();
    res.json(user);
}