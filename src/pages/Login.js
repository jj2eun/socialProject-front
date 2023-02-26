import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button, TextField } from '@mui/material';


const Login = () => {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {

        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            console.log(response);
            setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    const onClick = () => {
        // 인가 코드 받기

        // 앱 REST API 키
        const REST_API_KEY = '26b1dbdfa39817544790f688353c2451';
        // 인가 코드를 전달받을 서비스 서버의 URI
        const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';

        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <>
            <div>
                <form>
                    <div>아이디</div>
                    <TextField
                        name={'id'}
                        onChange={() => { }}
                    ></TextField>
                    <div>비밀번호</div>
                    <TextField
                        name={'password'}
                        onChange={() => { }}
                    ></TextField>
                    <div>
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >로그인</Button>
                        </div>
                        <div>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={onClick}
                            >카카오 로그인하기</Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
