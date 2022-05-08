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

  const [ReplyContent, setReplyContent] = useState('');
  const [UpdateReplyContent, setUpdateReplyContent] = useState('');

  const [SubmitMessage, setSubmitMessage] = useState('');

  const onOpenUpdateBox = () => {
    setUpdateReplyContent(qnaInfo.reply_content);
    setUpdateBox(true);
  };
  const onCloseUpdateBox = () => {
    setUpdateBox(false);
  };
  const onReplyContentHandler = (event) => {
    setReplyContent(event.target.value);
  };
  const onUpdateReplyContentHandler = (event) => {
    setUpdateReplyContent(event.target.value);
  };

  const onWriteHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (ReplyContent.length === 0) {
      setSubmitMessage('내용을 입력해주세요.');
      return;
    }

    const today = new Date();
    today.setHours(today.getHours() + 9);

    const reply_datetime =
      today.toISOString().substring(0, 10) +
      ' ' +
      today.toISOString().substring(11, 16);

    const body = {
      reply_content: ReplyContent,
      board_num: +qnaInfo.board_num,
      reply_datetime,
    };

    axios.post(`/api/qna/writeQnAReply`, body).then((response) => {
      if (response.data.success) {
        qnaReload(qnaInfo.board_num);
        reload();
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };

  const onUpdateHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (UpdateReplyContent.length === 0) {
      setSubmitMessage('내용을 입력해주세요.');
      return;
    }

    const body = {
      board_num: +qnaInfo.board_num,
      reply_content: UpdateReplyContent,
    };

    axios.patch(`/api/qna/updateQnAReply`, body).then((response) => {
      if (response.data.success) {
        setUpdateBox(false);
        qnaReload(qnaInfo.board_num);
        reload();
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };

  useEffect(() => {
    if (!open) {
      setReplyContent('');
      setUpdateReplyContent('');
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
            분류
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {qnaInfo && (qnaInfo.board_class === 'pt' ? 'PT' : '기타')}
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
            제목
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 3 }}>
            {qnaInfo && qnaInfo.title}
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
            {qnaInfo && qnaInfo.content}
          </Typography>
        </Box>
        {qnaInfo && qnaInfo.reply_status === 'no' && (
          <>
            <Divider sx={{ mt: 4 }} />
            <Typography
              sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}
              variant="h6"
              component="h2"
            >
              QnA 답변 등록
            </Typography>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                minRows={10}
                multiline
                onChange={onReplyContentHandler}
                label="내용"
              />
            </Box>
            <Box sx={{ p: '2px 4px' }}>
              <Button sx={{ float: 'right' }} onClick={onWriteHandler}>
                등록
              </Button>
            </Box>
          </>
        )}
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
            <Box sx={{ mt: 4, p: '2px 4px', display: 'flex' }}>
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
            {!updateBox && (
              <Box sx={{ p: '2px 4px' }}>
                <Button sx={{ float: 'right' }} onClick={onOpenUpdateBox}>
                  수정
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
                  QnA 답변 수정
                </Typography>
                <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
                  <TextField
                    sx={{ ml: 1, mt: 1, flex: 1 }}
                    minRows={10}
                    multiline
                    onChange={onUpdateReplyContentHandler}
                    defaultValue={UpdateReplyContent}
                    label="내용"
                  />
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
          </>
        )}
      </Box>
    </Modal>
  );
}

export default UserQnAViewModal;
