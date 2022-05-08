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

import { style } from '../etc/modal.style';

function NoticeViewModal({
  open,
  handleClose,
  noticeInfo,
  noticeReload,
  reload,
}) {
  const [updateBox, setUpdateBox] = useState(false);

  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [RegDate, setRegDate] = useState('');
  const [Writer, setWriter] = useState('');
  const [SubmitMessage, setSubmitMessage] = useState('');

  const onOpenUpdateBox = () => {
    setTitle(noticeInfo.title);
    setContent(noticeInfo.content);
    setRegDate(noticeInfo.reg_date);
    setWriter(noticeInfo.writer.name);
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

  const onUpdateHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (Title.length === 0 || Content.length === 0) {
      setSubmitMessage('모든 값을 입력해주세요.');
      return;
    }

    const body = {
      notice_num: +noticeInfo.notice_num,
      title: Title,
      content: Content,
    };

    axios.patch(`/api/notice/updateNotice`, body).then((response) => {
      if (response.data.success) {
        setUpdateBox(false);
        noticeReload(+noticeInfo.notice_num);
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
        `정말로 ${noticeInfo.notice_num}: ${noticeInfo.title}를 삭제하시겠습니까?`,
      )
    ) {
      return;
    }

    axios
      .delete(`/api/notice/deleteNotice/${noticeInfo.notice_num}`)
      .then((response) => {
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
      setTitle('');
      setContent('');
      setRegDate('');
      setWriter('');
      setUpdateBox(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box noValidate sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
          공지사항
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            게시물 번호
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {noticeInfo && noticeInfo.notice_num}
          </Typography>
          <Typography
            sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}
          ></Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            작성자
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {noticeInfo && noticeInfo.writer.name}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            작성일
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {noticeInfo && noticeInfo.reg_date}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            제목
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 3 }}>
            {noticeInfo && noticeInfo.title}
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
            내용
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }} colSpan={4}>
            {noticeInfo && noticeInfo.content}
          </Typography>
        </Box>
        {!updateBox && (
          <Box sx={{ p: '2px 4px' }}>
            <Button sx={{ float: 'right' }} onClick={onOpenUpdateBox}>
              수정
            </Button>
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
              sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}
              variant="h6"
              component="h2"
            >
              공지사항 수정
            </Typography>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                게시물 번호
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {noticeInfo && noticeInfo.notice_num}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                작성일
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {noticeInfo && noticeInfo.reg_date}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
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

export default NoticeViewModal;
