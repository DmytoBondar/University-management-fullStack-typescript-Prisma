import { authkey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setLocalStorage } from "@/utils/local-storage";

export const setUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setLocalStorage(authkey, accessToken as string)
}
export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authkey)
    if (authToken) {
        const decodetoken = decodedToken(authToken);
        return decodetoken
    } else {
        return ""
    }
}
export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authkey);
    return !!authToken
};

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key)
}