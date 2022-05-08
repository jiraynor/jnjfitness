import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';

import {
  Grid,
  Paper,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  TableHead,
  TableFooter,
  TablePagination,
} from '@mui/material';

import { Check, Pending } from '@mui/icons-material';

import { red } from '@mui/material/colors';

import TrainerQnAViewModal from './TrainerQnAViewModal';
import { TablePaginationActions } from '../etc/TablePaginationActions';

function TrainerQnAComponent() {
  const [qnaList, setQnAList] = useState([]);
  const [qnaInfo, setQnAInfo] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchConditon, setSearchCondition] = useState('');
  const [searchContent, setSearchContent] = useState('');

  const [viewModalOpen, setViewModalOpen] = useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - qnaList.length) : 0;

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const setViewModalOpenHandler = (board_num) => {
    axios.get(`/api/qna/getQnA/${board_num}`).then((response) => {
      setQnAInfo(response.data);
    });
    setViewModalOpen(true);
  };
  const setViewModalCloseHandler = () => {
    setViewModalOpen(false);
    setQnAInfo(null);
  };

  const reload = () => {
    axios.get(`/api/qna/getQnAList`).then((response) => {
      setQnAList(response.data);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSearchConditionHandler = (event) => {
    setSearchCondition(event.target.value);
  };

  const onSearchContentHandler = (event) => {
    setSearchContent(event.target.value);
  };

  const onGetAllListHandler = () => {
    axios.get(`/api/qna/getQnAList`).then((response) => {
      setQnAList(response.data);
    });
  };

  const onGetNoListHandler = () => {
    axios.get(`/api/qna/getQnAListNo`).then((response) => {
      setQnAList(response.data);
    });
  };

  const onSearchQnAHandler = (event) => {
    event.preventDefault();

    if (!searchConditon) return;

    const body = {
      condition: searchConditon,
      content: searchContent,
    };

    axios.post(`/api/qna/getQnAListCondition`, body).then((response) => {
      setQnAList(response.data);
    });
  };

  useEffect(() => {
    axios.get(`/api/qna/getQnAList`).then((response) => {
      setQnAList(response.data);
    });
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ fontWeight: 'bold', textAlign: 'center', p: 2 }}
          variant="h5"
          component="h2"
        >
          QnA 관리
        </Typography>
        <Box sx={{ mr: 2 }}>
          <Button
            sx={{ float: 'right' }}
            variant="text"
            size="large"
            onClick={onGetAllListHandler}
          >
            전체 리스트 보기
          </Button>
          <Button
            sx={{ float: 'right' }}
            color="warning"
            variant="text"
            size="large"
            onClick={onGetNoListHandler}
          >
            답변 미완료 리스트 보기
          </Button>
        </Box>
        <Box sx={{ m: 2 }}>
          <TableContainer>
            <Table aria-label="user table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#eeeeee' }}>
                  <TableCell sx={{ width: '45%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      제목
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
                      작성자
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
                      작성일
                    </span>
                  </TableCell>
                  <TableCell sx={{ width: '15%' }} align="center">
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      답변 여부
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? qnaList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : qnaList
                ).map((row) => (
                  <TableRow
                    style={{ cursor: 'pointer' }}
                    key={row.board_num}
                    hover
                    onClick={() => {
                      setViewModalOpenHandler(row.board_num);
                    }}
                  >
                    <TableCell scope="row" align="center">
                      {row.title}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.user.name}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.reg_datetime}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.reply_status === 'yes' ? (
                        <Check sx={{ color: red[500] }} />
                      ) : (
                        <Pending color="disabled" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={4}
                    count={qnaList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': '출력 게시물 수',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        <Box noValidate sx={{ m: 2, display: 'flex' }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel id="search-conditon-label">검색 조건</InputLabel>
            <Select
              labelId="search-conditon-label"
              id="search-conditon"
              label="검색 조건"
              onChange={onSearchConditionHandler}
            >
              <MenuItem value={'user'}>유저 번호</MenuItem>
              <MenuItem value={'title'}>제목</MenuItem>
              <MenuItem value={'content'}>내용</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ flex: 4, ml: 1, mr: 1 }}
            id="search-content"
            label="내용"
            variant="outlined"
            onChange={onSearchContentHandler}
          />
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            size="large"
            onClick={onSearchQnAHandler}
          >
            검색
          </Button>
        </Box>
      </Paper>
      <TrainerQnAViewModal
        open={viewModalOpen}
        handleClose={setViewModalCloseHandler}
        qnaReload={setViewModalOpenHandler}
        qnaInfo={qnaInfo}
        reload={reload}
      />
    </Grid>
  );
}

export default TrainerQnAComponent;
