import React, { useState } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';

import NoticeItem from './NoticeItem';

import { Grid, Paper, Typography, Modal, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  minHeight: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NoticeComponent() {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleOpen = (notice_num) => {
    const accessToken = cookies.load('accessToken');

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.get(`/api/notice/getNotice/${notice_num}`).then((response) => {
      console.log(response.data);
      setNotice(response.data);
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ fontWeight: 'bold', textAlign: 'center', p: 2 }}
          variant="h5"
          component="h2"
        >
          공지사항
        </Typography>
        <NoticeItem modalHandler={handleOpen} />
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                제목
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 5 }}>
                {notice && notice.title}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                작성자
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 2 }}>
                {notice && notice.writer.name}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                작성일
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 2 }}>
                {notice && notice.reg_date}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {notice && notice.content}
              </Typography>
            </Box>
          </Box>
        </Modal>
      </Paper>
    </Grid>
  );
}

export default NoticeComponent;
