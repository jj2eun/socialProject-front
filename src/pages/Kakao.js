import axios from 'axios';
import React from 'react';
const Kakao = () => {
    const href = window.location.href;
    const params = new URL(href).searchParams;

    // 인가코드
    const code = params.get('code');

    axios.get(`/login?code=${code}`)
        .then(result => {
            console.log(result)
        }).catch(error => {
            console.error(error)
        })

    /* 인가코드를 통해서 아래를 백으로 처리해야하나? */
    /*     axios({
            method: 'post',
            url: 'https://kauth.kakao.com/oauth/token',
            params: {
                grant_type: 'authorization_code',
                client_id: '26b1dbdfa39817544790f688353c2451',
                redirect_uri: 'http://localhost:3000/auth/kakao/callback',
                code: code
            }
        }).then(data => {
            console.log(data)
    
            const refresh_token = data.refresh_token
            const access_token = data.access_token
    
    
        })
     */

    return (
        console.log(code)

    )
}

export default Kakao;