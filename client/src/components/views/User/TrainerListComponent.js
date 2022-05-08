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
} from '@mui/icons-material';

import TrainerSignUpModal from './TrainerSignUpModal';
import TrainerViewModal from './TrainerViewModal';

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

function TrainerListComponent() {
  const [trainerList, setTrainerList] = useState([]);
  const [trainerInfo, setTrainerInfo] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchName, setSearchName] = useState('');

  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trainerList.length) : 0;

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const setSignUpModalOpenHandler = () => setSignUpModalOpen(true);
  const setSignUpModalCloseHandler = () => setSignUpModalOpen(false);
  const setViewModalOpenHandler = (id) => {
    axios.get(`/api/user/getTrainer/${id}`).then((response) => {
      setTrainerInfo(response.data);
    });
    setViewModalOpen(true);
  };
  const setViewModalCloseHandler = () => {
    setViewModalOpen(false);
    setTrainerInfo({});
  };

  const reload = () => {
    axios.get(`/api/user/getTrainers`).then((response) => {
      setTrainerList(response.data);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSearchContentHandler = (event) => {
    setSearchName(event.target.value);
  };

  const onSearchTrainerHandler = (event) => {
    axios.get(`/api/user/getTrainersName/${searchName}`).then((response) => {
      setTrainerList(response.data);
    });
  };

  useEffect(() => {
    axios.get(`/api/user/getTrainers`).then((response) => {
      setTrainerList(response.data);
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
          트레이너 리스트
        </Typography>
        <Box sx={{ mr: 2 }}>
          <Button
            sx={{ float: 'right' }}
            variant="text"
            size="large"
            onClick={setSignUpModalOpenHandler}
          >
            트레이너 등록
          </Button>
        </Box>
        <Box sx={{ m: 2 }}>
          <TableContainer>
            <Table aria-label="user table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#eeeeee' }}>
                  <TableCell align="center">
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
                  <TableCell align="center">
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
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? trainerList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : trainerList
                ).map((row) => (
                  <TableRow
                    style={{ cursor: 'pointer' }}
                    key={row.id}
                    hover
                    onClick={() => {
                      setViewModalOpenHandler(row.id);
                    }}
                  >
                    <TableCell scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.birth}
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={2} />
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
                    colSpan={2}
                    count={trainerList.length}
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
          <TextField
            sx={{ flex: 4, ml: 1, mr: 1 }}
            id="search-content"
            label="이름"
            variant="outlined"
            onChange={onSearchContentHandler}
          />
          <Button
            sx={{ flex: 1 }}
            variant="contained"
            size="large"
            onClick={onSearchTrainerHandler}
          >
            검색
          </Button>
        </Box>
      </Paper>
      <TrainerSignUpModal
        open={signUpModalOpen}
        handleClose={setSignUpModalCloseHandler}
        reload={reload}
      />
      <TrainerViewModal
        open={viewModalOpen}
        handleClose={setViewModalCloseHandler}
        trainerReload={setViewModalOpenHandler}
        trainerInfo={trainerInfo}
        reload={reload}
      />
    </Grid>
  );
}

export default TrainerListComponent;
