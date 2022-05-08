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

import { TablePaginationActions } from '../etc/TablePaginationActions';

import NoticeWriteModal from './NoticeWriteModal';
import NoticeViewModal from './NoticeViewModal';

function NoticeListComponent() {
  const [noticeList, setNoticeList] = useState([]);
  const [noticeInfo, setNoticeInfo] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchConditon, setSearchCondition] = useState('');
  const [searchContent, setSearchContent] = useState('');

  const [writeModalOpen, setwriteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - noticeList.length) : 0;

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const setWriteModalOpenHandler = () => setwriteModalOpen(true);
  const setWriteModalCloseHandler = () => setwriteModalOpen(false);
  const setViewModalOpenHandler = (notice_num) => {
    axios.get(`/api/notice/getNotice/${notice_num}`).then((response) => {
      setNoticeInfo(response.data);
    });
    setViewModalOpen(true);
  };
  const setViewModalCloseHandler = () => {
    setViewModalOpen(false);
    setNoticeInfo(null);
  };

  const reload = () => {
    axios.get(`/api/notice/getNoticeList`).then((response) => {
      setNoticeList(response.data);
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

  const onSearchNoticeHandler = (event) => {
    event.preventDefault();

    if (!searchConditon) return;

    const body = {
      condition: searchConditon,
      content: searchContent,
    };

    axios.post(`/api/notice/getNoticeListCondition`, body).then((response) => {
      setNoticeList(response.data);
    });
  };

  useEffect(() => {
    axios.get(`/api/notice/getNoticeList`).then((response) => {
      setNoticeList(response.data);
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
          공지사항 관리
        </Typography>
        <Box sx={{ mr: 2 }}>
          <Button
            sx={{ float: 'right' }}
            variant="text"
            size="large"
            onClick={setWriteModalOpenHandler}
          >
            공지사항 등록
          </Button>
        </Box>
        <Box sx={{ m: 2 }}>
          <TableContainer>
            <Table aria-label="user table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#eeeeee' }}>
                  <TableCell sx={{ width: '60%' }} align="center">
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
                      작성일
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
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? noticeList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : noticeList
                ).map((row) => (
                  <TableRow
                    style={{ cursor: 'pointer' }}
                    key={row.notice_num}
                    hover
                    onClick={() => {
                      setViewModalOpenHandler(row.notice_num);
                    }}
                  >
                    <TableCell scope="row" align="center">
                      {row.title}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.reg_date}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.writer.name}
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
                    colSpan={3}
                    count={noticeList.length}
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
            onClick={onSearchNoticeHandler}
          >
            검색
          </Button>
        </Box>
      </Paper>
      <NoticeWriteModal
        open={writeModalOpen}
        handleClose={setWriteModalCloseHandler}
        reload={reload}
      />
      <NoticeViewModal
        open={viewModalOpen}
        handleClose={setViewModalCloseHandler}
        noticeReload={setViewModalOpenHandler}
        noticeInfo={noticeInfo}
        reload={reload}
      />
    </Grid>
  );
}

export default NoticeListComponent;
