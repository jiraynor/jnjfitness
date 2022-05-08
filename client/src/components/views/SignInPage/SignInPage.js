import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInTrainer, signInUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Box,
  Typography,
  Container,
  RadioGroup,
  Radio,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Regular',
  },
});

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Type, setType] = useState('trainer');

  const onTypeHandler = (event) => {
    setType(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      id: data.get('id'),
      password: data.get('password'),
    };

    switch (Type) {
      case 'trainer':
        dispatch(signInTrainer(body)).then((response) => {
          const accessToken = response.payload.accessToken;

          if (accessToken) {
            navigate('/');
          }
        });
        break;
      case 'user':
        body.id = +body.id;

        dispatch(signInUser(body)).then((response) => {
          const accessToken = response.payload.accessToken;

          if (accessToken) {
            navigate('/');
          }
        });
        break;
      default:
        alert('로그인 타입을 지정해주세요.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            JnJ Fitness
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
            />
            <RadioGroup
              sx={{ display: 'flex', justifyContent: 'center' }}
              row
              defaultValue="trainer"
              name="type"
              onChange={onTypeHandler}
            >
              <FormControlLabel
                value="trainer"
                control={<Radio />}
                label="트레이너"
              />
              <FormControlLabel value="user" control={<Radio />} label="회원" />
            </RadioGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignInPage;
