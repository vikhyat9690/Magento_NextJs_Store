import axios from "axios";


export async function getCustomer() {
    const res = await axios.get('/api/magento/auth/me');
    console.log(res.data)
    return res.data;
}