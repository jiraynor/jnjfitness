import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';

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
  Alert,
} from '@mui/material';

function UserInfoComponent() {
  const [user, setUser] = useState({});
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 9);
  endDate.setDate(endDate.getDate() + 7);
  const expiration = endDate.toISOString().substring(0, 10);

  useEffect(() => {
    const cookies_user = JSON.parse(cookies.load('user').substr(2));
    setUser(cookies_user);
  }, []);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        {user.endDate <= expiration && (
          <Alert severity="error">남은 만료일이 7일 이하입니다.</Alert>
        )}

        <Typography
          sx={{ fontWeight: 'bold', textAlign: 'center', p: 2 }}
          variant="h5"
          component="h2"
        >
          회원 정보
        </Typography>
        <Box sx={{ m: 4 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      이름
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{user.name}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      성별
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{user.gender === 'man' ? '남' : '여'}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      주소
                    </span>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <span>{user.address}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      전화번호
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{user.tel}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      생년월일
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{user.birth}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      등록일
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{user.startDate}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      마감일
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{user.endDate}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      비고
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <span>{user.note}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Grid>
  );
}

export default UserInfoComponent;
