import React, { useEffect, useState } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';

import {
  Grid,
  Paper,
  Typography,
  Modal,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Divider,
} from '@mui/material';

function TrainerTodayPTComponent() {
  const [ptList, setPtList] = useState([]);

  const accessToken = cookies.load('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  useEffect(() => {
    axios.get(`/api/pt/getPTListToMyToday`).then((response) => {
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
          오늘 PT
        </Typography>
        <Box sx={{ m: 2 }}>
          {ptList.map((pt) => (
            <>
              <Divider />
              <Box sx={{ p: '2px 4px', mt: 1, display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                  회원 이름
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                  {pt.user.name}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                  회원 전화번호
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                  {pt.user.tel}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', mt: 1, display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                  시작 시간
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                  {pt.startTime}
                </Typography>
                <Typography sx={{ fontWeight: 'bold', ml: 1, mt: 1, flex: 1 }}>
                  종료 시간
                </Typography>
                <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                  {pt.endTime}
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', mt: 1, display: 'flex' }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    ml: 1,
                    mt: 1,
                    flex: 1,
                    textAlign: 'center',
                  }}
                >
                  비고
                </Typography>
              </Box>
              <Box sx={{ p: '2px 4px', mt: 1, display: 'flex' }}>
                <Typography sx={{ ml: 1, mt: 1, flex: 1 }}>
                  {pt.note}
                </Typography>
              </Box>
            </>
          ))}
        </Box>
      </Paper>
    </Grid>
  );
}

export default TrainerTodayPTComponent;
