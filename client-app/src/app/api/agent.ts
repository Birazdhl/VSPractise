import axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/activity";



axios.defaults.baseURL = 'https://localhost:44396/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url,body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url,body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities/GetActivityList'),
    details: (id: string) => requests.get(`/activities/GetActivity/${id}`),
    create: (activity : IActivity) => requests.post('/activities/CreateActivity',activity),
    update: (activity: IActivity) => requests.post(`/activities/EditActivity`, activity),
    delete: (id: string) => requests.get(`/activities/DeleteAtivity/${id}`)
}

export default{
    Activities
}