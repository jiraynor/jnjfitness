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
  Button,
  TableHead,
  TableFooter,
  TablePagination,
} from '@mui/material';

import TrainerPTViewModal from './TrainerPTViewModal';

import { TablePaginationActions } from '../etc/TablePaginationActions';

function TrainerPTListComponent({ openRegistComponenet }) {
  const [PtList, setPtList] = useState([]);
  const [PtInfo, setPtInfo] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchConditon, setSearchCondition] = useState('');
  const [searchContent, setSearchContent] = useState('');

  const [viewModalOpen, setViewModalOpen] = useState(false);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PtList.length) : 0;

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const setViewModalOpenHandler = (id) => {
    axios.get(`/api/pt/getPT/${id}`).then((response) => {
      console.log(response.data);
      setPtInfo(response.data);
    });

    setViewModalOpen(true);
  };
  const setViewModalCloseHandler = () => {
    setViewModalOpen(false);
    setPtInfo(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const reload = () => {
    axios.get(`/api/pt/getPTListToMy`).then((response) => {
      setPtList(response.data);
    });
  };

  const getAllList = () => {
    axios.get(`/api/pt/getPTList`).then((response) => {
      setPtList(response.data);
    });
  };

  useEffect(() => {
    axios.get(`/api/pt/getPTListToMy`).then((response) => {
      setPtList(response.data);
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
          PT ??????
        </Typography>
        <Box sx={{ mr: 2 }}>
          <Button
            sx={{ float: 'left' }}
            color="error"
            variant="text"
            size="large"
            onClick={openRegistComponenet}
          >
            PT ??????
          </Button>
          <Button
            sx={{ float: 'right' }}
            variant="text"
            size="large"
            onClick={reload}
          >
            ?????? ?????????
          </Button>
          <Button
            sx={{ float: 'right' }}
            color="success"
            variant="text"
            size="large"
            onClick={getAllList}
          >
            ?????? ?????????
          </Button>
        </Box>
        <Box sx={{ m: 2 }}>
          <TableContainer>
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
                      ????????????
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
                      ??????
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
                      ?????????
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
                      ?????????
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
                      ??????
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? PtList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : PtList
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
                      {row.user.id}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.trainer.name}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.startDate}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.endDate}
                    </TableCell>
                    <TableCell scope="row" align="center">
                      {row.days}
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
                    colSpan={5}
                    count={PtList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': '?????? ????????? ???',
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
      </Paper>
      <TrainerPTViewModal
        open={viewModalOpen}
        handleClose={setViewModalCloseHandler}
        ptInfo={PtInfo}
        ptReload={setViewModalOpenHandler}
        reload={reload}
      />
    </Grid>
  );
}

export default TrainerPTListComponent;
