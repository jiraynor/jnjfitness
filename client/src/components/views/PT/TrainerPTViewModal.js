import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
  IconButton,
  Divider,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { style } from '../etc/modal.style';

function TrainerPTViewModal({ open, handleClose, ptInfo, ptReload, reload }) {
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

  const [recordId, setRecordId] = useState(0);
  const [recordContent, setRecordContent] = useState('');

  const [bodyRecordId, setBodyRecordId] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [shoulder, setShoulder] = useState(0);
  const [chest, setChest] = useState(0);
  const [waist, setWaist] = useState(0);
  const [butt, setButt] = useState(0);
  const [thigh, setThigh] = useState(0);
  const [calf, setCalf] = useState(0);

  const [buttonBox, setButtonBox] = useState(true);
  const [updateBox, setUpdateBox] = useState(false);
  const [recordBox, setRecordBox] = useState(false);
  const [bodyRecordBox, setBodyRecordBox] = useState(false);
  const [recordUpdateBox, setRecordUpdateBox] = useState(false);
  const [bodyRecordUpdateBox, setBodyRecordUpdateBox] = useState(false);

  const [SubmitMessage, setSubmitMessage] = useState('');

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

  const onRecordContentHandler = (event) => {
    setRecordContent(event.target.value);
  };
  const onWeightHandler = (event) => {
    setWeight(event.target.value);
  };
  const onHeightHandler = (event) => {
    setHeight(event.target.value);
  };
  const onShoulderHandler = (event) => {
    setShoulder(event.target.value);
  };
  const onChestHandler = (event) => {
    setChest(event.target.value);
  };
  const onWaistHandler = (event) => {
    setWaist(event.target.value);
  };
  const onButtHandler = (event) => {
    setButt(event.target.value);
  };
  const onThighHandler = (event) => {
    setThigh(event.target.value);
  };
  const onCalfHandler = (event) => {
    setCalf(event.target.value);
  };

  const openUpdateBoxHandler = () => {
    setCnt(ptInfo.cnt);
    if (ptInfo.days.search('월') !== -1) setMon('월');
    if (ptInfo.days.search('화') !== -1) setTue('화');
    if (ptInfo.days.search('수') !== -1) setWed('수');
    if (ptInfo.days.search('목') !== -1) setThu('목');
    if (ptInfo.days.search('금') !== -1) setFri('금');
    if (ptInfo.days.search('토') !== -1) setSat('토');
    setStartDate(ptInfo.startDate);
    setEndDate(ptInfo.endDate);
    setStartTime(ptInfo.startTime);
    setEndTime(ptInfo.endTime);
    setNote(ptInfo.note);
    setButtonBox(false);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(true);
  };

  const closeUpdateBoxHandler = () => {
    setCnt('');
    setMon('');
    setTue('');
    setWed('');
    setThu('');
    setFri('');
    setSat('');
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setNote('');
    setButtonBox(true);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const openRecordBoxHandler = () => {
    setButtonBox(false);
    setRecordBox(true);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const closeRecordBoxHandler = () => {
    setRecordContent('');
    setButtonBox(true);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const openRecordUpdateBoxHandler = (record_id) => {
    axios.get(`/api/pt/getPTRecord/${record_id}`).then((response) => {
      setRecordId(record_id);
      setRecordContent(response.data.record_content);
    });
    setButtonBox(false);
    setRecordBox(false);
    setRecordUpdateBox(true);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const closeRecordUpdateBoxHandler = () => {
    setRecordId(0);
    setRecordContent('');
    setButtonBox(true);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const openBodyRecordBoxHandler = () => {
    setButtonBox(false);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(true);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const closeBodyRecordBoxHandler = () => {
    setWeight(0);
    setHeight(0);
    setShoulder(0);
    setChest(0);
    setWaist(0);
    setButt(0);
    setThigh(0);
    setCalf(0);
    setButtonBox(true);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const openBodyRecordUpdateBoxHandler = (body_record_id) => {
    axios.get(`/api/pt/getPTBodyRecord/${body_record_id}`).then((response) => {
      setBodyRecordId(body_record_id);
      setWeight(response.data.weight);
      setHeight(response.data.height);
      setShoulder(response.data.shoulder);
      setChest(response.data.chest);
      setWaist(response.data.waist);
      setButt(response.data.butt);
      setThigh(response.data.thigh);
      setCalf(response.data.calf);
    });
    setButtonBox(false);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(true);
    setUpdateBox(false);
  };

  const closeBodyRecordUpdateBoxHandler = () => {
    setWeight(0);
    setHeight(0);
    setShoulder(0);
    setChest(0);
    setWaist(0);
    setButt(0);
    setThigh(0);
    setCalf(0);
    setButtonBox(true);
    setRecordBox(false);
    setRecordUpdateBox(false);
    setBodyRecordBox(false);
    setBodyRecordUpdateBox(false);
    setUpdateBox(false);
  };

  const onUpdatePTHandler = () => {
    const days = Mon + Tue + Wed + Thu + Fri + Sat;

    if (
      cnt.length === 0 ||
      startTime.length === 0 ||
      endTime.length === 0 ||
      startDate.length === 0 ||
      endDate.length === 0 ||
      days.length === 0
    ) {
      setSubmitMessage('비고를 제외한 모든 값을 입력해주세요');
      return;
    }

    const body = {
      id: ptInfo.id,
      cnt,
      note,
      startTime,
      endTime,
      days,
      startDate,
      endDate,
    };

    axios.patch(`/api/pt/updatePT`, body).then((response) => {
      closeUpdateBoxHandler();
      ptReload(ptInfo.id);
    });
  };

  const onWriteRecordHandler = () => {
    if (recordContent.length === 0) {
      setSubmitMessage('내용을 입력해주세요');
      return;
    }

    const today = new Date();
    const record_date = today.toISOString().substring(0, 10);

    const body = {
      record_date,
      record_content: recordContent,
      ptId: ptInfo.id,
    };

    axios.post(`/api/pt/writePTRecord`, body).then((response) => {
      closeRecordBoxHandler();
      ptReload(ptInfo.id);
    });
  };

  const onUpdateRecordHandler = () => {
    if (recordContent.length === 0) {
      setSubmitMessage('내용을 입력해주세요');
      return;
    }

    const today = new Date();
    const record_date = today.toISOString().substring(0, 10);

    const body = {
      record_id: recordId,
      record_date,
      record_content: recordContent,
    };

    axios.patch(`/api/pt/updatePTRecord`, body).then((response) => {
      closeRecordUpdateBoxHandler();
      ptReload(ptInfo.id);
    });
  };

  const onWriteBodyRecordHandler = () => {
    if (weight.length === 0) {
      setSubmitMessage('몸무게는 필수입니다');
      return;
    }

    const today = new Date();
    today.setHours(today.getHours() + 9);
    const body_record_date = today.toISOString().substring(0, 10);

    const body = {
      body_record_date,
      weight: +weight,
      height: +height,
      shoulder: +shoulder,
      chest: +chest,
      waist: +waist,
      butt: +butt,
      thigh: +thigh,
      calf: +calf,
      ptId: ptInfo.id,
    };

    axios.post(`/api/pt/writePTBodyRecord`, body).then((response) => {
      closeBodyRecordBoxHandler();
      ptReload(ptInfo.id);
    });
  };

  const onUpdateBodyRecordHandler = () => {
    if (weight.length === 0) {
      setSubmitMessage('몸무게는 필수입니다');
      return;
    }

    const today = new Date();
    const body_record_date = today.toISOString().substring(0, 10);

    console.log(bodyRecordId);

    const body = {
      body_record_id: bodyRecordId,
      body_record_date,
      weight: +weight,
      height: +height,
      shoulder: +shoulder,
      chest: +chest,
      waist: +waist,
      butt: +butt,
      thigh: +thigh,
      calf: +calf,
      ptId: ptInfo.id,
    };

    axios.patch(`/api/pt/updatePTBodyRecord`, body).then((response) => {
      closeBodyRecordUpdateBoxHandler();
      ptReload(ptInfo.id);
    });
  };

  const onDeletePtHandler = () => {
    if (
      !window.confirm(
        `정말 ${ptInfo.user.name}님의 ${ptInfo.id}번 PT를 삭제하시겠습니까?`,
      )
    )
      return;

    axios.delete(`/api/pt/deletePT/${ptInfo.id}`).then((response) => {
      reload();
      handleClose();
    });
  };

  const onDeleteRecordHandler = (record_id) => {
    if (!window.confirm(`정말 ${record_id}번 기록을 삭제하시겠습니까?`)) return;

    axios.delete(`/api/pt/deletePTRecord/${record_id}`).then((response) => {
      ptReload(ptInfo.id);
    });
  };

  const onDeleteBodyRecordHandler = (body_record_id) => {
    if (
      !window.confirm(`정말 ${body_record_id}번 신체 기록을 삭제하시겠습니까?`)
    )
      return;

    axios
      .delete(`/api/pt/deletePTBodyRecord/${body_record_id}`)
      .then((response) => {
        ptReload(ptInfo.id);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box noValidate sx={[style, { mt: 1 }]}>
        <Typography sx={{ fontWeight: 'bolder' }} variant="h6" component="h2">
          PT 관리
        </Typography>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            PT 번호
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.id}
          </Typography>
          <Typography
            sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}
          ></Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            회원 이름
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.user.name}
          </Typography>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            회원 전화번호
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.user.tel}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            트레이너 이름
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.trainer.name}
          </Typography>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            트레이너 전화번호
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.trainer.tel}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            시작일
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.startDate}
          </Typography>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            종료일
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.endDate}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            시작 시간
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.startTime}
          </Typography>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            종료 시간
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.endTime}
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            요일
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.days}
          </Typography>
          <Typography sx={{ fontWeight: 'bolder', ml: 1, mt: 1, flex: 1 }}>
            횟수
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.cnt} 회
          </Typography>
        </Box>
        <Box sx={{ mt: 4, p: '2px 4px', display: 'flex' }}>
          <Typography
            sx={{
              fontWeight: 'bolder',
              ml: 1,
              mt: 1,
              flex: 1,
              textAlign: 'center',
            }}
          >
            비고
          </Typography>
        </Box>
        <Box sx={{ p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
            {ptInfo && ptInfo.note}
          </Typography>
        </Box>

        {buttonBox && (
          <Box sx={{ mt: 4, p: '2px 4px', display: 'flex' }}>
            <Box sx={{ ml: 'auto' }}>
              <Button color="error" onClick={onDeletePtHandler}>
                삭제
              </Button>
              <Button onClick={openUpdateBoxHandler}>수정</Button>
            </Box>
          </Box>
        )}
        <Divider sx={{ mt: 4 }} />

        {updateBox && (
          <>
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              PT 수정
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                PT 번호
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {ptInfo && ptInfo.id}
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                회원 이름
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {ptInfo && ptInfo.user.name}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                회원 전화번호
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {ptInfo && ptInfo.user.tel}
              </Typography>
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                트레이너 이름
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {ptInfo && ptInfo.trainer.name}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                트레이너 전화번호
              </Typography>
              <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                {ptInfo && ptInfo.trainer.tel}
              </Typography>
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="number"
                label="횟수"
                variant="outlined"
                value={cnt}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onCntHandler}
              />
              <FormGroup sx={{ ml: 3, mt: 1, flex: 3 }} row>
                <FormControlLabel
                  value="월"
                  checked={Mon === '월'}
                  control={<Checkbox color="default" />}
                  label="월"
                  onChange={onMonHandler}
                />
                <FormControlLabel
                  value="화"
                  checked={Tue === '화'}
                  control={<Checkbox color="default" />}
                  label="화"
                  onChange={onTueHandler}
                />
                <FormControlLabel
                  value="수"
                  checked={Wed === '수'}
                  control={<Checkbox color="default" />}
                  label="수"
                  onChange={onWedHandler}
                />
                <FormControlLabel
                  value="목"
                  checked={Thu === '목'}
                  control={<Checkbox color="default" />}
                  label="목"
                  onChange={onThuHandler}
                />
                <FormControlLabel
                  value="금"
                  checked={Fri === '금'}
                  control={<Checkbox color="default" />}
                  label="금"
                  onChange={onFriHandler}
                />
                <FormControlLabel
                  value="토"
                  checked={Sat === '토'}
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
                value={startDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onStartDateHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="date"
                label="종료 일"
                variant="outlined"
                value={endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onEndDateHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="time"
                label="시작 시간"
                variant="outlined"
                value={startTime}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onStartTimeHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                type="time"
                label="종료 시간"
                variant="outlined"
                value={endTime}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onEndTimeHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="비고"
                minRows={10}
                multiline
                variant="outlined"
                value={note}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onNoteHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <Box sx={{ ml: 'auto' }}>
                <Button color="error" onClick={closeUpdateBoxHandler}>
                  취소
                </Button>
                <Button onClick={onUpdatePTHandler}>수정</Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 4 }} />
          </>
        )}

        <Box sx={{ mt: 4, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
            PT 기록
          </Typography>
          {buttonBox && (
            <Box sx={{ ml: 'auto' }}>
              <Button color="success" onClick={openRecordBoxHandler}>
                레코드 기록
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 2 }}>
            기록 일
          </Typography>
          <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 6 }}>
            내용
          </Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
          <Typography sx={{ ml: 1, mt: 1, flex: 1 }}></Typography>
        </Box>
        {ptInfo &&
          ptInfo.records.map((record) => (
            <>
              <Box
                key={record.record_id}
                sx={{ p: '2px 4px', display: 'flex' }}
              >
                <Typography sx={{ ml: 1, mt: 1, flex: 2 }}>
                  {record.record_date}
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 6 }}>
                  {record.record_content}
                </Typography>
                <IconButton
                  sx={{ ml: 1, mt: 1, flex: 1 }}
                  color="error"
                  onClick={() => onDeleteRecordHandler(record.record_id)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  sx={{ ml: 1, mt: 1, flex: 1 }}
                  color="success"
                  onClick={() => openRecordUpdateBoxHandler(record.record_id)}
                >
                  <Edit />
                </IconButton>
              </Box>
            </>
          ))}
        <Divider sx={{ mt: 4 }} />
        {recordBox && (
          <>
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              레코드 기록
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="내용"
                minRows={5}
                multiline
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onRecordContentHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <Box sx={{ ml: 'auto' }}>
                <Button color="error" onClick={closeRecordBoxHandler}>
                  취소
                </Button>
                <Button onClick={onWriteRecordHandler}>기록</Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 4 }} />
          </>
        )}
        {recordUpdateBox && (
          <>
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              레코드 수정
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="내용"
                value={recordContent}
                minRows={5}
                multiline
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onRecordContentHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <Box sx={{ ml: 'auto' }}>
                <Button color="error" onClick={closeRecordUpdateBoxHandler}>
                  취소
                </Button>
                <Button onClick={onUpdateRecordHandler}>수정</Button>
              </Box>
            </Box>
            <Divider sx={{ mt: 4 }} />
          </>
        )}
        <Box sx={{ mt: 4, p: '2px 4px', display: 'flex' }}>
          <Typography sx={{ fontWeight: 'bold' }} variant="h6" component="h2">
            신체 정보 기록
          </Typography>
          {buttonBox && (
            <Box sx={{ ml: 'auto' }}>
              <Button color="success" onClick={openBodyRecordBoxHandler}>
                신체 정보 기록
              </Button>
            </Box>
          )}
        </Box>
        {ptInfo &&
          ptInfo.body_records.map((body_record) => (
            <>
              <Box
                sx={{
                  mt: 2,
                  p: '2px 4px',
                  display: 'flex',
                  backgroundColor: '#dddddd',
                }}
                key={body_record.body_record_id}
              >
                <Typography
                  sx={{ ml: 1, mt: 1, mb: 1, flex: 1, textAlign: 'center' }}
                >
                  {body_record.body_record_date}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', display: 'flex' }}>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  몸무게
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.weight}
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  키
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.height}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', display: 'flex' }}>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  어깨
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.shoulder}
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  가슴
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.chest}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', display: 'flex' }}>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  허리
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.waist}
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  엉덩이
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.butt}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', display: 'flex' }}>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  허벅지
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.thigh}
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  종아리
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1, textAlign: 'center' }}>
                  {body_record.calf}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', display: 'flex' }}>
                <IconButton
                  sx={{ flex: 1 }}
                  color="error"
                  onClick={() =>
                    onDeleteBodyRecordHandler(body_record.body_record_id)
                  }
                >
                  <Delete />
                </IconButton>
                <IconButton
                  sx={{ flex: 1 }}
                  onClick={() =>
                    openBodyRecordUpdateBoxHandler(body_record.body_record_id)
                  }
                >
                  <Edit color="success" />
                </IconButton>
              </Box>
            </>
          ))}

        {bodyRecordBox && (
          <>
            <Divider sx={{ mt: 4 }} />
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              신체 레코드 기록
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="몸무게"
                type="number"
                variant="outlined"
                onChange={onWeightHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="키"
                type="number"
                variant="outlined"
                onChange={onHeightHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="어깨"
                type="number"
                variant="outlined"
                onChange={onShoulderHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="가슴"
                type="number"
                variant="outlined"
                onChange={onChestHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="허리"
                type="number"
                variant="outlined"
                onChange={onWaistHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="엉덩이"
                type="number"
                variant="outlined"
                onChange={onButtHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="허벅지"
                type="number"
                variant="outlined"
                onChange={onThighHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="종아리"
                type="number"
                variant="outlined"
                onChange={onCalfHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <Box sx={{ ml: 'auto' }}>
                <Button color="error" onClick={closeBodyRecordBoxHandler}>
                  취소
                </Button>
                <Button onClick={onWriteBodyRecordHandler}>기록</Button>
              </Box>
            </Box>
          </>
        )}

        {bodyRecordUpdateBox && (
          <>
            <Divider sx={{ mt: 4 }} />
            <Typography
              sx={{ fontWeight: 'bold', mt: 4 }}
              variant="h6"
              component="h2"
            >
              신체 레코드 수정
            </Typography>
            <Box sx={{ mt: 2, p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="몸무게"
                type="number"
                variant="outlined"
                value={weight}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onWeightHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="키"
                type="number"
                variant="outlined"
                value={height}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onHeightHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="어깨"
                type="number"
                variant="outlined"
                value={shoulder}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onShoulderHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="가슴"
                type="number"
                variant="outlined"
                value={chest}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChestHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', display: 'flex' }}>
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="허리"
                type="number"
                variant="outlined"
                value={waist}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onWaistHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="엉덩이"
                type="number"
                variant="outlined"
                value={butt}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onButtHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="허벅지"
                type="number"
                variant="outlined"
                value={thigh}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onThighHandler}
              />
              <TextField
                sx={{ ml: 1, mt: 1, flex: 1 }}
                label="종아리"
                type="number"
                variant="outlined"
                value={calf}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onCalfHandler}
              />
            </Box>
            <Box sx={{ p: '2px 4px', mt: 2, display: 'flex' }}>
              <Box sx={{ ml: 'auto' }}>
                <Button color="error" onClick={closeBodyRecordUpdateBoxHandler}>
                  취소
                </Button>
                <Button onClick={onUpdateBodyRecordHandler}>수정</Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default TrainerPTViewModal;
