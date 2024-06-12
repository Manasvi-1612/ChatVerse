import { useSelector } from "react-redux";
import { authSelector } from "../redux/slices/authSlice";
import { jwtDecode, JwtPayload } from "jwt-decode"; // Add this import statement

type authToken = {
    _id: string;
    email: string;
}

const useAuth = () => {
    const token = useSelector(authSelector);


    if (token) {
        const decoded = jwtDecode<authToken>(JSON.stringify(token));

        const { _id, email } = decoded;

        if (!_id || !email) {
            return null;
        }

        return token;
    }

    return null;
}

export default useAuth;