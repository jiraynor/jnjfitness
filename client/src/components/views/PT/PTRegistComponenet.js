import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';

import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function PTRegistComponenet({ closeRegistComponenet }) {
  const [userId, setUserId] = useState('');
  const [TrainerId, setTrainerId] = useState('');
  const [UserName, setUserName] = useState('');
  const [TrainerName, setTrainerName] = useState('');
  const [cnt, setCnt] = useState('');
  const [Mon, setMon] = useState('');
  const [Tue, setTue] = useState('');
  const [Wed, setWed] = useState('');
  const [Thu, setThu] = useState('');
  const [Fri, setFri] = useState('');
  const [Sat, setSat] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [note, setNote] = useState('');

  const [UserList, setUserList] = useState([]);
  const [TrainerList, setTrainerList] = useState([]);

  const [UserCondition, setUserCondition] = useState('');
  const [UserContent, setUserContent] = useState('');
  const [TrainerContent, setTrainerContent] = useState('');

  const [userModal, setUserModal] = useState(false);
  const [trainerModal, setTrainerModal] = useState(false);

  const [SubmitMessage, setSubmitMessage] = useState('');

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const onCntHandler = (event) => {
    setCnt(event.target.value);
  };
  const onMonHandler = (event) => {
    if (event.target.checked) setMon('월');
    else setMon('');
  };
  const onTueHandler = (event) => {
    if (event.target.checked) setTue('화');
    else setTue('');
  };
  const onWedHandler = (event) => {
    if (event.target.checked) setWed('수');
    else setWed('');
  };
  const onThuHandler = (event) => {
    if (event.target.checked) setThu('목');
    else setThu('');
  };
  const onFriHandler = (event) => {
    if (event.target.checked) setFri('금');
    else setFri('');
  };
  const onSatHandler = (event) => {
    if (event.target.checked) setSat('토');
    else setSat('');
  };
  const onStartDateHandler = (event) => {
    setStartDate(event.target.value);
  };
  const onEndDateHandler = (event) => {
    setEndDate(event.target.value);
  };
  const onStartTimeHandler = (event) => {
    setStartTime(event.target.value);
  };
  const onEndTimeHandler = (event) => {
    setEndTime(event.target.value);
  };
  const onNoteHandler = (event) => {
    setNote(event.target.value);
  };

  const setUserModalOpenHandler = () => setUserModal(true);
  const setUserModalCloseHandler = () => setUserModal(false);
  const setTrainerModalOpenHandler = () => setTrainerModal(true);
  const setTrainerModalCloseHandler = () => setTrainerModal(false);

  const onUserConditionHandler = (event) => {
    setUserCondition(event.target.value);
  };
  const onUserContentHandler = (event) => {
    setUserContent(event.target.value);
  };

  const onSearchUserHandler = (event) => {
    event.preventDefault();

    if (!UserCondition) return;

    const body = {
      condition: UserCondition,
      content: UserContent,
    };

    axios.post(`/api/user/getUsersCondition`, body).then((response) => {
      setUserList(response.data);
    });
  };

  const setUserIdHandler = (id, name) => {
    setUserId(id);
    setUserName(name);
    setUserModal(false);
    setUserContent('');
    setUserList([]);
  };

  const onTrainerContentHandler = (event) => {
    setTrainerContent(event.target.value);
  };

  const onSearchTrainerHandler = (event) => {
    event.preventDefault();

    axios
      .get(`/api/user/getTrainersName/${TrainerContent}`)
      .then((response) => {
        setTrainerList(response.data);
      });
  };

  const setTrainerIdHandler = (id, name) => {
    setTrainerId(id);
    setTrainerName(name);
    setTrainerModal(false);
    setTrainerContent('');
    setTrainerList([]);
  };

  const onRegistPTHandelr = () => {
    const days = Mon + Tue + Wed + Thu + Fri + Sat;

    if (
      !cnt ||
      startTime.length === 0 ||
      endTime.length === 0 ||
      days.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      userId.length == 0
    ) {
      alert('비고를 제외한 모든 값을 입력해주세요.');
      setSubmitMessage('비고를 제외한 모든 값을 입력해주세요.');
      return;
    }

    const body = {
      cnt: +cnt,
      note,
      startTime,
      endTime,
      days,
      startDate,
      endDate,
      userId,
    };

    axios.post(`/api/pt/registPT`, body).then((response) => {
      closeRegistComponenet();
    });
  };

  useEffect(() => {
    axios.get(`/api/pt/getPTListToMy`).then((response) => {});
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ fontWeight: 'bold', textAlign: 'center', p: 2 }}
          variant="h6"
          component="h2"
        >
          PT 등록
        </Typography>
        <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            label="회원 이름"
            variant="outlined"
            value={UserName}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            sx={{ ml: 1, mt: 1, flex: 1 }}
            onClick={setUserModalOpenHandler}
          >
            회원 검색
          </Button>
        </Box>
        <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="number"
            label="횟수"
            variant="outlined"
            onChange={onCntHandler}
          />
          <FormGroup sx={{ ml: 3, mt: 1, flex: 3 }} row>
            <FormControlLabel
              value="월"
              control={<Checkbox color="default" />}
              label="월"
              onChange={onMonHandler}
            />
            <FormControlLabel
              value="화"
              control={<Checkbox color="default" />}
              label="화"
              onChange={onTueHandler}
            />
            <FormControlLabel
              value="수"
              control={<Checkbox color="default" />}
              label="수"
              onChange={onWedHandler}
            />
            <FormControlLabel
              value="목"
              control={<Checkbox color="default" />}
              label="목"
              onChange={onThuHandler}
            />
            <FormControlLabel
              value="금"
              control={<Checkbox color="default" />}
              label="금"
              onChange={onFriHandler}
            />
            <FormControlLabel
              value="토"
              control={<Checkbox color="default" />}
              label="토"
              onChange={onSatHandler}
            />
          </FormGroup>
        </Box>
        <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="date"
            label="시작 일"
            variant="outlined"
            onChange={onStartDateHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="date"
            label="종료 일"
            variant="outlined"
            onChange={onEndDateHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="time"
            label="시작 시간"
            variant="outlined"
            onChange={onStartTimeHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            type="time"
            label="종료 시간"
            variant="outlined"
            onChange={onEndTimeHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
          <TextField
            sx={{ ml: 1, mt: 1, flex: 1 }}
            label="비고"
            minRows={10}
            multiline
            variant="outlined"
            onChange={onNoteHandler}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box sx={{ p: '2px 4px', mt: 2 }}>
          <Button
            sx={{ float: 'right' }}
            variant="text"
            size="large"
            onClick={onRegistPTHandelr}
          >
            등록
          </Button>
          <Button
            sx={{ float: 'right' }}
            color="error"
            variant="text"
            size="large"
            onClick={closeRegistComponenet}
          >
            취소
          </Button>
        </Box>
      </Paper>

      <Modal open={userModal} onClose={setUserModalCloseHandler}>
        <Box sx={style}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
            유저 검색
          </Typography>
          <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
            <FormControl sx={{ ml: 1, mt: 1, flex: 1 }}>
              <InputLabel id="board-class-label">검색 조건</InputLabel>
              <Select
                labelId="board-class-label"
                label="검색 조건"
                onChange={onUserConditionHandler}
              >
                <MenuItem value={'id'} defaultChecked>
                  회원번호
                </MenuItem>
                <MenuItem value={'name'}>이름</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ ml: 1, mt: 1, flex: 2 }}
              onChange={onUserContentHandler}
              label="내용"
            />
            <Button
              sx={{ ml: 1, mt: 1, flex: 1 }}
              onClick={onSearchUserHandler}
            >
              검색
            </Button>
          </Box>
          <TableContainer sx={{ mt: 2 }}>
            <Table aria-label="user table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#eeeeee' }}>
                  <TableCell sx={{ width: '20%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      회원번호
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '20%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      이름
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '30%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      생년월일
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '30%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      전화번호
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {UserList &&
                  UserList.map((row) => (
                    <TableRow
                      style={{ cursor: 'pointer' }}
                      key={row.id}
                      hover
                      onClick={() => {
                        setUserIdHandler(row.id, row.name);
                      }}
                    >
                      <TableCell scope="row" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.birth}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.tel}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            <Button
              sx={{ mt: 2, float: 'right' }}
              color="error"
              onClick={setUserModalCloseHandler}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={trainerModal} onClose={setTrainerModalCloseHandler}>
        <Box sx={style}>
          <Typography id="trainer-modal-title" variant="h6" component="h2">
            트레이너 검색
          </Typography>
          <Box sx={{ p: '2px 4px', display: 'flex' }}>
            <TextField
              sx={{ ml: 1, mt: 1, flex: 3 }}
              onChange={onTrainerContentHandler}
              label="이름"
            />
            <Button
              sx={{ ml: 1, mt: 1, flex: 1 }}
              onClick={onSearchTrainerHandler}
            >
              검색
            </Button>
          </Box>
          <TableContainer sx={{ mt: 2 }}>
            <Table aria-label="trainer table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#eeeeee' }}>
                  <TableCell sx={{ width: '20%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      아이디
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '20%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      이름
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '30%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      생년월일
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '30%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      전화번호
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TrainerList &&
                  TrainerList.map((row) => (
                    <TableRow
                      style={{ cursor: 'pointer' }}
                      key={row.id}
                      hover
                      onClick={() => {
                        setTrainerIdHandler(row.id, row.name);
                      }}
                    >
                      <TableCell scope="row" align="center">
                        {row.id}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.birth}
                      </TableCell>
                      <TableCell scope="row" align="center">
                        {row.tel}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            <Button
              sx={{ mt: 2, float: 'right' }}
              color="error"
              onClick={setTrainerModalCloseHandler}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
}

export default PTRegistComponenet;
