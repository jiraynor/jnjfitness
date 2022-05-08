import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';
import PropTypes from 'prop-types';

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
  IconButton,
  TableFooter,
  TablePagination,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import {
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Check,
  Pending,
} from '@mui/icons-material';

import UserQnAWriteModal from './UserQnAWriteModal';
import UserQnAViewModal from './UserQnAViewModal';
import { red } from '@mui/material/colors';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function UserQnAComponent() {
  const [qnaList, setQnAList] = useState([]);
  const [qnaInfo, setQnAInfo] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchConditon, setSearchCondition] = useState('');
  const [searchContent, setSearchContent] = useState('');

  const [writeModalOpen, setwriteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - qnaList.length) : 0;

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const setWriteModalOpenHandler = () => setwriteModalOpen(true);
  const setWriteModalCloseHandler = () => setwriteModalOpen(false);
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
    axios.get(`/api/qna/getQnAListUser`).then((response) => {
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

  const onSearchQnAHandler = (event) => {
    event.preventDefault();

    if (!searchConditon) return;

    const body = {
      condition: searchConditon,
      content: searchContent,
    };

    axios.post(`/api/qna/getQnAListUserCondition`, body).then((response) => {
      setQnAList(response.data);
    });
  };

  useEffect(() => {
    axios.get(`/api/qna/getQnAListUser`).then((response) => {
      setQnAList(response.data);
    });
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ textAlign: 'center', p: 2 }}
          variant="h4"
          component="h4"
        >
          QnA
        </Typography>
        <Box sx={{ mr: 2 }}>
          <Button
            sx={{ float: 'right' }}
            variant="text"
            size="large"
            onClick={setWriteModalOpenHandler}
          >
            질문 등록
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
                    colSpan={3}
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
      <UserQnAWriteModal
        open={writeModalOpen}
        handleClose={setWriteModalCloseHandler}
        reload={reload}
      />
      <UserQnAViewModal
        open={viewModalOpen}
        handleClose={setViewModalCloseHandler}
        qnaReload={setViewModalOpenHandler}
        qnaInfo={qnaInfo}
        reload={reload}
      />
    </Grid>
  );
}

export default UserQnAComponent;
