import axios from 'axios';
import {
    SIGNIN_TRAINER,
    SIGNIN_USER,
    SIGNUP_TRAINER,
    SIGNUP_USER,
    AUTH_USER,
    GET_TRAINER,
    GET_USER
} from './types';
import cookies from 'react-cookies';

export function signInTrainer(dataToSubmit) {
    const request = axios.post('api/auth/signinTrainer', dataToSubmit)
                        .then(response => response.data)
                        .catch(error => {
                            switch(error.response.status) {
                                case 400:
                                    alert('잘못된 로그인 형식입니다.');
                                    break;
                                case 401:
                                    alert('로그인 정보가 일치하지 않습니다.');
                                    break;
                            }
                        });
    return {
        type: SIGNIN_TRAINER,
        payload: request
    }
}

export function signInUser(dataToSubmit) {
    const request = axios.post('api/auth/signinUser', dataToSubmit)
                        .then(response => response.data)
                        .catch(error => {
                            switch(error.response.status) {
                                case 400:
                                    alert('잘못된 로그인 형식입니다.');
                                    break;
                                case 401:
                                    alert('로그인 정보가 일치하지 않습니다.');
                                    break;
                            }
                        });
    return {
        type: SIGNIN_TRAINER,
        payload: request
    }
}

export function signUpTrainer(dataToSubmit) {
    const request = axios.post('/api/user/signUpTrainer', dataToSubmit)
                        .then(response => response.data);

    return {
        type: SIGNUP_TRAINER,
        payload: request
    }
}

export function signUpUser(dataToSubmit) {
    const request = axios.post('/api/user/signUpUser', dataToSubmit)
                        .then(response => response.data);

    return {
        type: SIGNUP_USER,
        payload: request
    }
}

export function auth() {

    const accessToken = cookies.load('accessToken');

    let request = Promise.resolve('');

    if(!accessToken) {
        return {
            type: AUTH_USER,
            payload: request
        }
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    request = axios.get('/api/auth')
                        .then(response => response.data)
                        .catch(error => {
                            console.log(error.response.status);
                        });

    
    return {
        type: AUTH_USER,
        payload: request
    }
    
}

export function getTrainer(id) {
    const request = axios.get(`/api/user/checkTrainer/${id}`)
                        .then(response => response.data);
    
    return {
        type: GET_TRAINER,
        payload: request
    }                    
}

export function getUser(id) {
    const request = axios.get(`/api/user/checkUser/${id}`)
                        .then(response => response.data);

    return {
        type: GET_USER,
        payload: request
    }
}