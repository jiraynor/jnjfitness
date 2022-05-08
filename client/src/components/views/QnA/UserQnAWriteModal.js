import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
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
  InputLabel,
  Select,
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

function UserQnAWriteModal({ open, handleClose, reload }) {
  const [BoardClass, setBoardClass] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [RegDateTime, setRegDateTime] = useState('');
  const [SubmitMessage, setSubmitMessage] = useState('');

  const onBoardClassHandler = (event) => {
    setBoardClass(event.target.value);
  };
  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (BoardClass.length === 0 || Title.length === 0 || Content.length === 0) {
      setSubmitMessage('비고를 제외한 모든 값을 입력해주세요.');
      return;
    }

    const today = new Date();
    today.setHours(today.getHours() + 9);

    const reg_datetime =
      today.toISOString().substring(0, 10) +
      ' ' +
      today.toISOString().substring(11, 16);

    const body = {
      board_class: BoardClass,
      title: Title,
      content: Content,
      reg_datetime,
    };

    axios.post(`/api/qna/writeQnA`, body).then((response) => {
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
          QnA 작성
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <FormControl sx={{ ml: 1, mt: 1, flex: 1 }}>
            <InputLabel id="board-class-label">분류</InputLabel>
            <Select
              labelId="board-class-label"
              id="board-class"
              label="분류"
              onChange={onBoardClassHandler}
            >
              <MenuItem value={'pt'} defaultChecked>
                PT
              </MenuItem>
              <MenuItem value={'nomal'}>기타</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 3 }}
            onChange={onTitleHandler}
            defaultValue={Title}
            label="제목"
          />
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            minRows={10}
            multiline
            onChange={onContentHandler}
            defaultValue={Content}
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
          <Button onClick={onSubmitHandler} sx={{ flex: 1 }}>
            등록
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserQnAWriteModal;
