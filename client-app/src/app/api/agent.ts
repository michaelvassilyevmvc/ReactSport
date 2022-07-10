import axios, { AxiosResponse } from 'axios'
import { Person } from '../models/person';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    }
    catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get:  <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put:  <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del:  <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Persons = {
    list: () => requests.get<Person[]>('/persons'),
    details: (id: string) => requests.get<Person>(`/persons/${id}`),
    create: (person: Person) => axios.post<void>('/persons', person),
    update: (person: Person) => axios.put<void>(`/persons/${person.id}`, person),
    delete: (id: string) => axios.delete<void>(`/persons/${id}`)
}

const agent = {
    Persons
}

export default agent;