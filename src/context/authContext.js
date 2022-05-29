import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [encodedToken, setEncodedToken] = useState(localStorage.getItem("token"));

    const SignupUser = async (firstName, lastName, username, email, password) => {
        try {
            const res = await axios.post(`/api/auth/signup`, {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            });
            setUser(res.data.createdUser);
            setEncodedToken(res.data.encodedToken);
            localStorage.setItem("token", JSON.stringify(res.data.encodedToken));
            return user;
        }
        catch (e) {
            console.log(e);
        }
    }

    const LoginUser = async (email, password) => {
        try {
            const res = await axios.post(`/api/auth/login`, {
                email: email,
                password: password
            });
            setUser(res.data.foundUser);
            setEncodedToken(res.data.encodedToken);
            localStorage.setItem("token", JSON.stringify(res.data.encodedToken));
            return true;
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, encodedToken, setEncodedToken, SignupUser, LoginUser }}>
            {children}
        </AuthContext.Provider>
    )
}