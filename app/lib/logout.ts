import axios from "axios";

export async function Logout() {
    sessionStorage.clear();
    localStorage.clear()
    const res =  await axios.post('/api/magento/auth/logout');
    console.log(res.data)
    return res.data;
}