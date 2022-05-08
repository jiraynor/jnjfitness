import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signUpUser, getUser } from '../../../_actions/user_action';
import {
  Modal,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Alert,
  FormLabel,
  Divider,
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

function UserQnAViewModal({ open, handleClose, qnaInfo, qnaReload, reload }) {
  const [updateBox, setUpdateBox] = useState(false);

  const [BoardClass, setBoardClass] = useState('');
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [RegDateTime, setRegDateTime] = useState('');
  const [User, setUser] = useState('');
  const [SubmitMessage, setSubmitMessage] = useState('');

  const onOpenUpdateBox = () => {
    setBoardClass(qnaInfo.board_class);
    setTitle(qnaInfo.title);
    setContent(qnaInfo.content);
    setRegDateTime(qnaInfo.reg_datetime);
    setUser(qnaInfo.user.name);
    setUpdateBox(true);
  };
  const onCloseUpdateBox = () => {
    setUpdateBox(false);
  };
  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };
  const onBoardClassHandler = (event) => {
    setBoardClass(event.target.value);
  };

  const onUpdateHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (BoardClass.length === 0 || Title.length === 0 || Content.length === 0) {
      setSubmitMessage('모든 값을 입력해주세요.');
      return;
    }

    const body = {
      board_num: +qnaInfo.board_num,
      board_class: BoardClass,
      title: Title,
      content: Content,
    };

    axios.patch(`/api/qna/updateQnA`, body).then((response) => {
      if (response.data.success) {
        setUpdateBox(false);
        qnaReload(qnaInfo.board_num);
        reload();
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };

  const onDeleteHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (
      !window.confirm(
        `정말로 ${qnaInfo.board_num}: ${qnaInfo.title}를 삭제하시겠습니까?`,
      )
    ) {
      return;
    }

    axios.delete(`/api/qna/deleteQnA/${qnaInfo.board_num}`).then((response) => {
      if (response.data.success) {
        reload();
        handleClose();
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };

  useEffect(() => {
    if (!open) {
      setBoardClass('');
      setTitle('');
      setContent('');
      setRegDateTime('');
      setUser('');
      setUpdateBox(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box noValidate sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
          QnA
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            게시물 번호
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {qnaInfo && qnaInfo.board_num}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            작성일
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {qnaInfo && qnaInfo.reg_datetime}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            제목
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {qnaInfo && qnaInfo.title}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            작성자
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {qnaInfo && qnaInfo.user.name}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            분류
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {qnaInfo && (qnaInfo.board_class === 'pt' ? 'PT' : '기타')}
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              ml: 1,
              mt: 1,
              flex: 1,
              textAlign: 'center',
            }}
            colSpan={4}
          >
            내용
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }} colSpan={4}>
            {qnaInfo && qnaInfo.content}
          </Typography>
        </Box>
        {qnaInfo && qnaInfo.reply_status === 'yes' && (
          <>
            <Divider sx={{ mt: 4 }} />
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              답변
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                답변자
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {qnaInfo && qnaInfo.reply_writer.name}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                답변 작성일
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {qnaInfo && qnaInfo.reply_datetime}
              </Typography>
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  ml: 1,
                  mt: 1,
                  flex: 1,
                  textAlign: 'center',
                }}
                colSpan={4}
              >
                답변 내용
              </Typography>
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }} colSpan={4}>
                {qnaInfo && qnaInfo.reply_content}
              </Typography>
            </Box>
          </>
        )}
        {!updateBox && (
          <Box sx={{ p: '2px 4px' }}>
            {qnaInfo && qnaInfo.reply_status === 'no' && (
              <Button sx={{ float: 'right' }} onClick={onOpenUpdateBox}>
                수정
              </Button>
            )}
            <Button
              color="error"
              sx={{ float: 'right' }}
              onClick={onDeleteHandler}
            >
              삭제
            </Button>
          </Box>
        )}
        {updateBox && (
          <>
            <Divider sx={{ mt: 4 }} />
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              공지사항 수정
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                게시물 번호
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {qnaInfo && qnaInfo.board_num}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                작성일
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {qnaInfo && qnaInfo.reg_datetime}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <FormControl sx={{ ml: 1, mt: 1, flex: 1 }}>
                <InputLabel id="board-class-label">분류</InputLabel>
                <Select
                  labelId="board-class-label"
                  id="board-class"
                  label="분류"
                  onChange={onBoardClassHandler}
                  defaultValue={BoardClass}
                >
                  <MenuItem value={'pt'} defaultChecked={BoardClass === 'pt'}>
                    PT
                  </MenuItem>
                  <MenuItem
                    value={'nomal'}
                    defaultChecked={BoardClass == 'nomal'}
                  >
                    기타
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 3 }}
                onChange={onTitleHandler}
                defaultValue={Title}
                label="제목"
              />
            </Box>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
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
            <Box sx={{ p: '2px 4px' }}>
              <Button sx={{ float: 'right' }} onClick={onUpdateHandler}>
                수정
              </Button>
              <Button
                sx={{ float: 'right' }}
                color="error"
                onClick={onCloseUpdateBox}
              >
                취소
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default UserQnAViewModal;
