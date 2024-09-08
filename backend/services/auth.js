const signup = () => {

    return { data: "you hit the signup endpoint" }

}

const login = () => {

    return { data: "you hit the login endpoint" }

}

const logout = () => {

    return { data: "you hit the logout endpoint" }

}

const authServices = { signup, login, logout }

export default authServices;