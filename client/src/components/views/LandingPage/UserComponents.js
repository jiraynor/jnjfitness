import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';
import NoticeComponent from '../Notice/NoticeComponent';
import UserInfoComponent from '../User/UserInfoComponent';
import UserPTComponent from '../PT/UserPTComponent';
import UserQnAComponent from '../QnA/UserQnAComponent';

function UserComponents({ link }) {
  const [pt, setPt] = useState(null);

  const DashboardComponet = ({ pt }) => {
    return (
      <>
        <NoticeComponent />
        <UserInfoComponent />
        {pt && <UserPTComponent pt={pt} />}
      </>
    );
  };

  useEffect(() => {
    const cookies_user = JSON.parse(cookies.load('user').substr(2));
    const accessToken = cookies.load('accessToken');

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.get(`/api/pt/getPTToUser/${cookies_user.id}`).then((response) => {
      setPt(response.data);
    });
  }, []);

  return (
    <>
      {link === 'dashboard' && <DashboardComponet pt={pt} />}
      {link === 'qna' && <UserQnAComponent />}
    </>
  );
}

export default UserComponents;
