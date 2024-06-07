import axios from "axios";
import {
    loginData,
    loginResponse,
    userdocs,
    getUserdocsResponse,
    createUserdocsResponse
} from "../types/types";
import Cookies from "universal-cookie";

const host = 'https://test.v5.pryaniky.com';
const validToken = () => {
    const cookies = new Cookies(null, { path: '/' });
    const token:string = cookies.get('token');
    return token
}

export const userdocsApi ={
    getUserdocs() : Promise<getUserdocsResponse>{
        return axios.get(`${host}/ru/data/v3/testmethods/docs/userdocs/get`,{ headers:{ 'x-auth' : validToken()}})
            .then(response=>{
                return response.data
        })
    },
    setUserdocs(data: userdocs):Promise<createUserdocsResponse>{
        return axios.post(`${host}/ru/data/v3/testmethods/docs/userdocs/set/${data.id}`, data, { headers:{ 'x-auth' : validToken()}})
            .then(response=>{
                return response.data
            })
    },
    removeItemFromUserdocs(data:userdocs){
        return axios.post(`${host}/ru/data/v3/testmethods/docs/userdocs/delete/${data.id}`,data.id,{ headers:{ 'x-auth' : validToken()}})
            .then(response=>{
                return response.data
            })
    },
    createNewItem(data: userdocs):Promise<createUserdocsResponse>{
        const {id, ...restdata} = data
        return axios.post(`${host}/ru/data/v3/testmethods/docs/userdocs/create`, restdata, { headers:{ 'x-auth' : validToken()}})
            .then(response=>{
                return {...response.data, oldId: id}
            })
    }
}

export const authApi = {
    login(loginData:loginData):Promise<loginResponse> {
        return axios.post(`${host}/ru/data/v3/testmethods/docs/login`, loginData).then(response => response.data)
    },
}