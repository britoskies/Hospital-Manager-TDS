import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

// User Auth Model
import UserAuth from "../../models/userauth/UserAuth";

// Mui
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Box,
  Paper,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";

type Props = {};

function SignIn({}: Props) {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const [signinError, setsigninError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [values, setValues] = React.useState({
    showPassword: true,
  });

  const navigate = useNavigate();

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const checkEmptyEmail = () => email === "";
  const checkEmptyPassword = () => password === "";

  const auth = async () => {
    if (checkEmptyEmail()) {
      setEmailError(true);
    }

    if (checkEmptyPassword()) {
      setPasswordError(true);
    }

    if (emailError || passwordError) {
      return false;
    }

    const result = await UserAuth.authUser(email, password);

    if (!result) {
      return setsigninError(true);
    }

    return navigate("/");
  };

  const handleEnter = (e: any) => {
    if (e.key == "Enter") {
      auth();
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    setsigninError(false);
    if (checkEmptyEmail()) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  useEffect(() => {
    setsigninError(false);
    if (checkEmptyPassword()) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  return (
    <Paper className="signin-form">
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, fontWeight: 500 }}
      >
        Login
      </Typography>
      <Box className="signin-form-inputs">
        <TextField
          variant="outlined"
          label="Correo"
          type={"email"}
          onChange={(e) => handleEmail(e)}
          className="signin-input"
          sx={{ pb: 3 }}
          error={emailError}
          onKeyDown={(e) => handleEnter(e)}
          helperText={emailError ? "No se permiten campos vacios" : null}
          fullWidth
        />
        <FormControl sx={{ width: "100%", pb: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={!values.showPassword ? "text" : "password"}
            onChange={(e) => handlePassword(e)}
            className="signin-input"
            error={passwordError}
            onKeyDown={(e) => handleEnter(e)}
            //helperText={passwordError ? "Please fill this field" : null}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>
            {passwordError ? "No se permiten campos vacios" : null}
          </FormHelperText>
        </FormControl>
        <FormControlLabel
          control={<Checkbox />}
          label="Recordarme"
          sx={{ pb: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => auth()}
          fullWidth
          disableElevation
        >
          Ingresar
        </Button>
      </Box>
      <Box
        className="signin-form-helpers"
        sx={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormHelperText sx={{ fontSize: "1rem" }} error>
          {signinError ? "Credenciales desconocidas!" : null}
        </FormHelperText>
        <Typography component="a" href="#">
          Olvidaste tu contraseña?
        </Typography>
      </Box>
    </Paper>
  );
}

export default SignIn;
