import axios from 'axios'
let BASE_URL ='http://localhost:3000'

export const request = () => {
    let token =  localStorage.getItem("jwt");
    
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(instance.defaults);

    return instance;

}