import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function UserViewModal({ open, handleClose, userInfo, userReload, reload }) {
  const [updateBox, setUpdateBox] = useState(false);

  const [Name, setName] = useState('');
  const [Address, setAddress] = useState('');
  const [Tel, setTel] = useState('');
  const [Birth, setBirth] = useState('');
  const [Gender, setGender] = useState('');
  const [Note, setNote] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [AddMonth, setAddMonth] = useState('0');

  const [TelChecked, setTelChecked] = useState(true);

  const [TelMessage, setTelMessage] = useState('');
  const [SubmitMessage, setSubmitMessage] = useState('');

  const onOpenUpdateBox = () => {
    setName(userInfo.name);
    setTel(userInfo.tel);
    setAddress(userInfo.address);
    setBirth(userInfo.birth);
    setGender(userInfo.gender);
    setStartDate(userInfo.startDate);
    setEndDate(userInfo.endDate);
    setAddMonth('0');
    setUpdateBox(true);
  };
  const onCloseUpdateBox = () => {
    setUpdateBox(false);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const onTelHandler = (event) => {
    setTel(event.target.value);
  };
  const onBirthHandler = (event) => {
    console.log(event.target.value);
    setBirth(event.target.value);
  };
  const onGenderHandler = (event) => {
    setGender(event.target.value);
  };
  const onNoteHandler = (event) => {
    setNote(event.target.value);
  };
  const onStartDateHandler = (event) => {
    setStartDate(event.target.value);
  };
  const onEndDateHandler = (event) => {
    setEndDate(event.target.value);
  };
  const onAddMonthHandler = (event) => {
    if (!StartDate) {
      alert('?????? ?????? ?????? ????????? ?????????.');
      return;
    }
    let add = event.target.value;
    if (add === '0') return;
    setAddMonth(add);

    const date = new Date(StartDate);

    date.setMonth(date.getMonth() + +add);
    date.setDate(date.getDate() - 1);

    setEndDate(date.toISOString().substring(0, 10));
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
      setTelMessage('????????? ??????????????? ???????????????.');
      setTelChecked(false);
      return;
    }
  };

  const onUpdateHandler = (event) => {
    // ?????? ????????? ??????
    event.preventDefault();

    if (
      Name.length === 0 ||
      Tel.length === 0 ||
      Birth.length === 0 ||
      Address.length === 0 ||
      StartDate.length === 0 ||
      EndDate.length === 0
    ) {
      setSubmitMessage('????????? ????????? ?????? ?????? ??????????????????.');
      return;
    }

    if (!TelChecked) {
      setSubmitMessage('????????? ??????????????? ???????????????.');
      return;
    }

    const body = {
      id: +userInfo.id,
      name: Name,
      address: Address,
      tel: Tel,
      birth: Birth,
      gender: Gender,
      note: Note,
      startDate: StartDate,
      endDate: EndDate,
    };

    axios.patch(`/api/user/updateUser`, body).then((response) => {
      console.log(response);
      if (response.data.success) {
        setUpdateBox(false);
        userReload(+userInfo.id);
        reload();
      } else {
        setSubmitMessage(response.data.message);
      }
    });
  };

  const onDeleteHandler = (event) => {
    // ?????? ????????? ??????
    event.preventDefault();

    if (
      !window.confirm(
        `????????? ${userInfo.id}: ${userInfo.name} ?????? ????????? ?????????????????????????`,
      )
    ) {
      return;
    }

    console.log(+userInfo.id);

    const body = {
      id: userInfo.id,
    };

    axios.delete(`/api/user/deleteUser/${userInfo.id}`).then((response) => {
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
      setAddress('');
      setBirth('');
      setGender('');
      setStartDate('');
      setEndDate('');
      setAddMonth('0');
      setUpdateBox(false);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box noValidate sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
          ?????? ??????
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ?????????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>{userInfo.id}</Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ??????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {userInfo.name}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ????????????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>{userInfo.tel}</Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ??????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {userInfo.gender === 'man' ? '??????' : '??????'}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ????????????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {userInfo.birth}
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ?????????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {userInfo.startDate}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ?????????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {userInfo.endDate}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
            ??????
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 3 }}>
            {userInfo.address}
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
          >
            ??????
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {userInfo.note}
          </Typography>
        </Box>
        {!updateBox && (
          <Box sx={{ p: '2px 4px' }}>
            <Button sx={{ float: 'right' }} onClick={onOpenUpdateBox}>
              ??????
            </Button>
            <Button
              color="error"
              sx={{ float: 'right' }}
              onClick={onDeleteHandler}
            >
              ??????
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
              ?????? ?????? ??????
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                onChange={onNameHandler}
                defaultValue={Name}
                label="??????"
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                onChange={onTelHandler}
                onKeyUp={onCheckTel}
                defaultValue={Tel}
                label="????????????"
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
                onChange={onAddressHandler}
                defaultValue={Address}
                label="??????"
              />
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="date"
                onChange={onBirthHandler}
                defaultValue={Birth}
                label="????????????"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl sx={{ ml: 1, mt: 1, flex: 1 }}>
                <FormLabel id="gender-label">??????</FormLabel>
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
                    label="??????"
                  />
                  <FormControlLabel
                    value="woman"
                    control={
                      <Radio
                        onChange={onGenderHandler}
                        checked={Gender === 'woman' ? true : false}
                      />
                    }
                    label="??????"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                onChange={onNoteHandler}
                label="??????"
              />
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="date"
                defaultValue={StartDate}
                onChange={onStartDateHandler}
                label="?????????"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControl sx={{ ml: 1, mt: 1, flex: 1 }}>
                <InputLabel id="during-month-label">?????? ??????</InputLabel>
                <Select
                  labelId="during-month-label"
                  id="during-month"
                  value={AddMonth}
                  label="?????? ??????"
                  onChange={onAddMonthHandler}
                >
                  <MenuItem value={1}>1 ??????</MenuItem>
                  <MenuItem value={3}>3 ??????</MenuItem>
                  <MenuItem value={6}>6 ??????</MenuItem>
                  <MenuItem value={12}>12 ??????</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="date"
                defaultValue={EndDate}
                onChange={onEndDateHandler}
                label="?????????"
                InputLabelProps={{
                  shrink: true,
                }}
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
                ??????
              </Button>
              <Button
                sx={{ float: 'right' }}
                color="error"
                onClick={onCloseUpdateBox}
              >
                ??????
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default UserViewModal;
