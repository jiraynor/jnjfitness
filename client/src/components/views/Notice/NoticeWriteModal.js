import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signUpTrainer, getTrainer } from '../../../_actions/user_action';
import {
  Modal,
  Box,
  Typography,
  MenuItem,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Alert,
  FormLabel,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NoticeWriteModal({ open, handleClose, reload }) {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  const [SubmitMessage, setSubmitMessage] = useState('');

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    let _content = event.target.value
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace('\n', '<br />');
    setContent(_content);
  };

  const onWriteHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (Title.length === 0 || Content.length === 0) {
      setSubmitMessage('모든 값을 입력해주세요.');
      return;
    }
    const today = new Date();
    today.setHours(today.getHours() + 9);
    const reg_date = today.toISOString().substring(0, 10);

    const body = {
      title: Title,
      content: Content,
      reg_date: reg_date,
    };

    axios.post(`/api/notice/writeNotice`, body).then((response) => {
      if (response.data.success) {
        reload();
        handleClose();
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box noValidate sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
          공지사항 등록
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', mb: 1, display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="text"
            onChange={onTitleHandler}
            label="제목"
          />
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            onChange={onContentHandler}
            minRows={10}
            multiline
            label="내용"
          />
        </Box>
        <Box sx={{ p: '2px 4px', mb: 1, display: 'flex' }}>
          {SubmitMessage !== '' && (
            <Alert sx={{ ml: 1, mt: 1, flex: 1 }} severity="error">
              {SubmitMessage}
            </Alert>
          )}
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Button onClick={onWriteHandler} sx={{ flex: 1 }}>
            작성
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default NoticeWriteModal;
