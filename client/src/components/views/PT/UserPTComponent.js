import React, { useState, useEffect } from 'react';
import cookies from 'react-cookies';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  Grid,
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

function UserPTComponent({ pt }) {
  const trainer = pt.trainer;
  const records = pt.records;
  const bodyRecords = pt.body_records;

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ m: 4 }}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: '#dddddd' }}>
                  <TableCell colSpan={4} align="center">
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      PT 정보
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      시작일
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{pt.startDate}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      종료일
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{pt.endDate}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      요일
                    </span>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <span>{pt.days}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      시작 시간
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{pt.startTime}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      종료 시간
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{pt.endTime}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      횟수
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{pt.cnt}</span>
                  </TableCell>
                  <TableCell align="center">
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      담당 트레이너
                    </span>
                  </TableCell>
                  <TableCell>
                    <span>{trainer.name}</span>
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
                    <span>{pt.note}</span>
                  </TableCell>
                </TableRow>
                <TableRow sx={{ mt: 2, backgroundColor: '#dddddd' }}>
                  <TableCell colSpan={4} align="center">
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      PT 기록
                    </span>
                  </TableCell>
                </TableRow>
                {records.map((row) => (
                  <TableRow key={row.record_id}>
                    <TableCell align="center">
                      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {row.record_date}
                      </span>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <span>{row.record_content}</span>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#dddddd' }}>
                  <TableCell colSpan={4} align="center">
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      신체 기록
                    </span>
                  </TableCell>
                </TableRow>
                {bodyRecords.map((row) => (
                  <>
                    <TableRow
                      key={row.body_record_id}
                      sx={{ backgroundColor: '#eeeeee' }}
                    >
                      <TableCell colSpan={4} align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          {row.body_record_date}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          키
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.height}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          몸무게
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.weight}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          어깨
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.shoulder}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          가슴
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.chest}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          허리
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.waist}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          엉덩이
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.butt}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          허벅지
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.thigh}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          종아리
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row.calf}</span>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Grid>
  );
}

export default UserPTComponent;
