import React, { useState } from 'react';
import NoticeComponent from '../Notice/NoticeComponent';
import UserListComponent from '../User/UserListComponent';
import TrainerListComponent from '../User/TrainerListComponent';
import NoticeListComponent from '../Notice/NoticeListComponent';
import TrainerQnAComponent from '../QnA/TrainerQnAComponent';
import TrainerPTListComponent from '../PT/TrainerPTListComponent';
import PTRegistComponenet from '../PT/PTRegistComponenet';
import UserExpirationListComponenet from '../User/UserExpirationListComponenet';
import TrainerTodayPTComponent from '../User/TrainerTodayPTComponent';

function TrainerComponents({ link }) {
  const [reload, setReload] = useState(false);

  const DashboardComponets = () => {
    return (
      <>
        <NoticeComponent />
        <UserExpirationListComponenet />
        <TrainerTodayPTComponent />
      </>
    );
  };

  const PTManagerComponets = () => {
    const [OpenReigst, setOpenRegist] = useState(false);

    const openRegistComponenet = () => {
      setOpenRegist(true);
    };

    const closeRegistComponenet = () => {
      setReload(!reload);
      setOpenRegist(false);
    };

    return (
      <>
        <TrainerPTListComponent openRegistComponenet={openRegistComponenet} />

        {OpenReigst && (
          <PTRegistComponenet closeRegistComponenet={closeRegistComponenet} />
        )}
      </>
    );
  };

  return (
    <>
      {link === 'dashboard' && <DashboardComponets />}
      {link === 'userList' && <UserListComponent />}
      {link === 'trainerList' && <TrainerListComponent />}
      {link === 'noticeManager' && <NoticeListComponent />}
      {link === 'qnaManager' && <TrainerQnAComponent />}
      {link === 'ptManager' && <PTManagerComponets />}
    </>
  );
}

export default TrainerComponents;
