import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        const navigate = useNavigate();
        const dispatch = useDispatch();
        
        useEffect(() => {

            dispatch(auth())
                .then(response => {

                    // 로그인 하지 않은 상태
                    if(!response.payload) {
                        if(option) {
                            navigate('/signIn');
                        }
                    } 
                    
                })
                .catch(e => {
                    console.log('에러');
                })

        }, []);

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}