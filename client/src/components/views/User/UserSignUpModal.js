import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
} from '@mui/material';

import { style } from '../etc/modal.style';

function UserSignUpModal({ open, handleClose, reload }) {
  const dispatch = useDispatch();
  const [Id, setId] = useState('');
  const [Password, setPassowrd] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Name, setName] = useState('');
  const [Address, setAddress] = useState('');
  const [Tel, setTel] = useState('');
  const [Birth, setBirth] = useState('');
  const [Gender, setGender] = useState('man');
  const [Note, setNote] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [AddMonth, setAddMonth] = useState('0');

  const [Checked, setChecked] = useState(false);
  const [PasswordChecked, setPasswordChecked] = useState(false);
  const [PasswordConfirmChecked, setPasswordConfirmChecked] = useState(false);
  const [TelChecked, setTelChecked] = useState(false);

  const [IdMessage, setIdMessage] = useState('');
  const [PasswordMessage, setPasswordMessage] = useState('');
  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [TelMessage, setTelMessage] = useState('');
  const [SubmitMessage, setSubmitMessage] = useState('');

  const onIdHandler = (event) => {
    setId(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassowrd(event.target.value);
  };
  const onConfirmPassworddHandler = (event) => {
    setConfirmPassword(event.target.value);
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

  const onCheckIdHandler = (event) => {
    event.preventDefault();

    const pattern = /[\d]/;

    if (!pattern.test(Id)) {
      setIdMessage('?????? ???????????? ???????????????.');
      return;
    }

    if (+Id < 1) {
      setIdMessage('?????? ???????????? 1??????????????? ?????????.');
      return;
    }

    setIdMessage('');
    dispatch(getUser(Id)).then((response) => {
      if (!response.payload.success) {
        setChecked(true);
      } else {
        setIdMessage(response.payload.message);
      }
    });
  };

  const onCheckPasswordPattern = (event) => {
    event.preventDefault();

    if (Password.length < 8 || Password.length > 20) {
      setPasswordMessage('??????????????? 8??? ?????? 20??? ??????????????? ?????????.');
      setPasswordChecked(false);
      return;
    }

    const pattern1 = /[0-9]/;
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[!@#?_]/;

    if (
      !pattern1.test(Password) ||
      !pattern2.test(Password) ||
      !pattern3.test(Password)
    ) {
      // TODO : ????????? + ?????? + ????????????(!@#?_) ??? ??????????????????
      setPasswordMessage(
        '??????????????? ???????????? ??????, ????????????(!@#?_)??? ?????? ???????????? ?????????.',
      );
      setPasswordChecked(false);
      return;
    }

    setPasswordMessage('');
    setPasswordChecked(true);
  };

  const onCheckPasswordConfirm = (event) => {
    event.preventDefault();

    if (PasswordChecked && Password === ConfirmPassword) {
      // TODO : ???????????? ??????
      setPasswordConfirmMessage('');
      setPasswordConfirmChecked(true);
      return;
    } else {
      // TODO : ???????????? ?????????
      setPasswordConfirmMessage('??????????????? ????????? ?????????.');
      setPasswordConfirmChecked(false);
      return;
    }
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

  const reset = () => {
    setId('');
    setPassowrd('');
    setConfirmPassword('');
    setName('');
    setAddress('');
    setTel('');
    setBirth('');
    setGender('man');
    setNote('');
    setStartDate('');
    setEndDate('');
    setAddMonth(0);
    setChecked(false);
    setPasswordChecked(false);
    setPasswordConfirmChecked(false);
    setTelChecked(false);
    setIdMessage('');
    setPasswordMessage('');
    setPasswordConfirmMessage('');
    setTelMessage('');
    setSubmitMessage('');
  };

  const modalClose = () => {
    reset();
    handleClose();
  };

  const onSubmitHandler = (event) => {
    // ?????? ????????? ??????
    event.preventDefault();

    if (
      Id.length === 0 ||
      Password.length === 0 ||
      ConfirmPassword.length === 0 ||
      Name.length === 0 ||
      Tel.length === 0 ||
      Birth.length === 0 ||
      Address.length === 0 ||
      StartDate.length === 0 ||
      EndDate.length === 0 ||
      AddMonth === '0'
    ) {
      setSubmitMessage('????????? ????????? ?????? ?????? ??????????????????.');
      return;
    }

    if (!Checked) {
      setSubmitMessage('????????? ??????????????? ????????????.');
      return;
    }

    if (!PasswordChecked) {
      setSubmitMessage('???????????? ????????? ???????????? ???????????????.');
      return;
    }

    if (!PasswordConfirmChecked) {
      setSubmitMessage('??????????????? ?????? ????????????.');
      return;
    }

    if (!TelChecked) {
      setSubmitMessage('????????? ??????????????? ???????????????.');
      return;
    }

    const body = {
      id: +Id,
      password: Password,
      name: Name,
      address: Address,
      tel: Tel,
      birth: Birth,
      gender: Gender,
      note: Note,
      startDate: StartDate,
      endDate: EndDate,
    };

    dispatch(signUpUser(body)).then((response) => {
      if (response.payload.success) {
        reset();
        reload();
        handleClose();
      } else {
        setSubmitMessage(response.payload.message);
      }
    });
  };
  return (
    <Modal open={open} onClose={modalClose}>
      <Box noValidate sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
          ?????? ??????
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="number"
            onChange={onIdHandler}
            label="?????? ??????"
          />
          <Button sx={{ ml: 1, mt: 1, flex: 1 }} onClick={onCheckIdHandler}>
            ????????????
          </Button>
        </Box>
        <Box sx={{ p: '2px 4px', mb: 1, display: 'flex' }}>
          {IdMessage !== '' && (
            <Alert sx={{ ml: 1, mt: 1, flex: 1 }} severity="error">
              {IdMessage}
            </Alert>
          )}
          {Checked && (
            <Alert sx={{ ml: 1, mt: 1, flex: 1 }} severity="success">
              ?????? ????????? ??????????????????.
            </Alert>
          )}
        </Box>
        <Box sx={{ p: '2px 4px', mb: 1, p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="password"
            onChange={onPasswordHandler}
            onKeyUp={onCheckPasswordPattern}
            label="????????????"
          />
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="password"
            onChange={onConfirmPassworddHandler}
            onKeyUp={onCheckPasswordConfirm}
            label="???????????? ??????"
          />
        </Box>
        <Box sx={{ p: '2px 4px', mb: 1, display: 'flex' }}>
          {PasswordMessage !== '' && (
            <Alert sx={{ ml: 1, mt: 1, flex: 1 }} severity="error">
              {PasswordMessage}
            </Alert>
          )}
          {PasswordConfirmMessage !== '' && (
            <Alert sx={{ ml: 1, mt: 1, flex: 1 }} severity="error">
              {PasswordConfirmMessage}
            </Alert>
          )}
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            onChange={onNameHandler}
            label="??????"
          />
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            onChange={onTelHandler}
            onKeyUp={onCheckTel}
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
            label="??????"
          />
        </Box>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="date"
            onChange={onBirthHandler}
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
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="date"
            value={StartDate}
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
            value={EndDate}
            label="?????????"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
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
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Button onClick={onSubmitHandler} sx={{ flex: 1 }}>
            ??????
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserSignUpModal;
