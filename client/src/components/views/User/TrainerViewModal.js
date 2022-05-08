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

function TrainerViewModal({
  open,
  handleClose,
  trainerInfo,
  trainerReload,
  reload,
}) {
  const [updateBox, setUpdateBox] = useState(false);

  const [Name, setName] = useState('');
  const [Tel, setTel] = useState('');
  const [Birth, setBirth] = useState('');
  const [Gender, setGender] = useState('');

  const [TelChecked, setTelChecked] = useState(true);

  const [TelMessage, setTelMessage] = useState('');
  const [SubmitMessage, setSubmitMessage] = useState('');

  const onOpenUpdateBox = () => {
    setName(trainerInfo.name);
    setTel(trainerInfo.tel);
    setBirth(trainerInfo.birth);
    setGender(trainerInfo.gender);
    setUpdateBox(true);
  };
  const onCloseUpdateBox = () => {
    setUpdateBox(false);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onTelHandler = (event) => {
    setTel(event.target.value);
  };
  const onBirthHandler = (event) => {
    setBirth(event.target.value);
  };
  const onGenderHandler = (event) => {
    setGender(event.target.value);
  };

  const onCheckTel = (event) => {
    event.preventDefault();

    const pattern1 = /\d{3}-\d{4}-\d{4}/;
    const pattern2 = /\d{3}-\d{3}-\d{4}/;
    const pattern3 = /\d{2}-\d{3}-\d{4}/;
    const pattern4 = /\d{2}-\d{4}-\d{4}/;

    if (
      pattern1.test(Tel) ||
      pattern2.test(Tel) ||
      pattern3.test(Tel) ||
      pattern4.test(Tel)
    ) {
      setTelMessage('');
      setTelChecked(true);
      return;
    } else {
      setTelMessage('올바른 전화번호를 입력하세요.');
      setTelChecked(false);
      return;
    }
  };

  const onUpdateHandler = (event) => {
    // 기본 이벤트 제거
    event.preventDefault();

    if (Name.length === 0 || Tel.length === 0 || Birth.length === 0) {
      setSubmitMessage('비고를 제외한 모든 값을 입력해주세요.');
      return;
    }

    if (!TelChecked) {
      setSubmitMessage('올바른 전화번호를 입력하세요.');
      return;
    }

    const body = {
      id: trainerInfo.id,
      name: Name,
      tel: Tel,
      birth: Birth,
      gender: Gender,
    };

    axios.patch(`/api/notice/updateTrainer`, body).then((response) => {
      if (response.data.success) {
        setUpdateBox(false);
        trainerReload(trainerInfo.id);
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
        `정말로 ${trainerInfo.id}: ${trainerInfo.name} 트레이너 정보를 삭제하시겠습니까?`,
      )
    ) {
      return;
    }

    axios
      .delete(`/api/user/deleteTrainer/${trainerInfo.id}`)
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
      setName('');
      setTel('');
      setBirth('');
      setGender('');
      setUpdateBox(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
          트레이너 정보
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            아이디
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {trainerInfo.id}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            이름
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {trainerInfo.name}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            전화번호
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {trainerInfo.tel}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            성별
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {trainerInfo.gender === 'man' ? '남자' : '여자'}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            생년월일
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {trainerInfo.birth}
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
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
              트레이너 정보 수정
            </Typography>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                onChange={onNameHandler}
                defaultValue={Name}
                label="이름"
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                onChange={onTelHandler}
                onKeyUp={onCheckTel}
                defaultValue={Tel}
                label="전화번호"
              />
            </Box>
            <Box sx={{ p: '2px 4px', mb: 1, display: 'flex' }}>
              {TelMessage !== '' && (
                <Alert sx={{ ml: 1, mt: 1, flex: 1 }} severity="error">
                  {TelMessage}
                </Alert>
              )}
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="date"
                onChange={onBirthHandler}
                defaultValue={Birth}
                label="생년월일"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl sx={{ ml: 1, mt: 1, flex: 1 }}>
                <FormLabel id="gender-label">성별</FormLabel>
                <RadioGroup
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  row
                  aria-labelledby="gender-label-label"
                  name="signup-gender"
                >
                  <FormControlLabel
                    value="man"
                    control={
                      <Radio
                        onChange={onGenderHandler}
                        checked={Gender === 'man' ? true : false}
                      />
                    }
                    label="남자"
                  />
                  <FormControlLabel
                    value="woman"
                    control={
                      <Radio
                        onChange={onGenderHandler}
                        checked={Gender === 'woman' ? true : false}
                      />
                    }
                    label="여자"
                  />
                </RadioGroup>
              </FormControl>
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

export default TrainerViewModal;
