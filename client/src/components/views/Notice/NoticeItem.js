import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';

import { TablePaginationActions } from '../etc/TablePaginationActions';

function NoticeItem({ modalHandler }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const accessToken = cookies.load('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.get('/api/notice/getNoticeList').then((response) => {
      setRows(response.data);
    });
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#dddddd' }}>
            <TableCell align="center">
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                제목
              </span>
            </TableCell>
            <TableCell align="center">
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                작성자
              </span>
            </TableCell>
            <TableCell align="center">
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                날짜
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.notice_num}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                modalHandler(row.notice_num);
              }}
              hover
            >
              <TableCell align="center" component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.writer.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center">
                {row.reg_date}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
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
  );
}

export default NoticeItem;
