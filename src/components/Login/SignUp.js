import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useContext, useState} from 'react';
import AuthService from "../../services/auth.service";
import {AppContext} from "../../App";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Fritzzzz1">
                Liraz Software Inc.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { setShowSignUp, setShowGame, setCurrentUser } = useContext(AppContext);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        setSuccessful(false);
        AuthService.register(username, password).then(
            (response) => {
                setMessage(response.data);
                setSuccessful(true);
                AuthService.login(username, password).then(
                    () => {
                        window.location.reload()
                    },
                    (error) => {
                        const resMessage = (error.response && error.response.data) || error.message
                        setMessage(resMessage.detail);
                    }
                )
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data) || error.message
                setMessage(resMessage);
                setSuccessful(false);
                setShowGame(false);
                setLoading(false)
            }
        );
    }

    const handleGuest = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const guest = AuthService.getCurrentUser("guest");
        setCurrentUser(guest);
        setShowSignUp(false);
        setShowGame(true);
    };

    const signIn = () => {
        setShowSignUp(false);
    };

    return (
        <div className="login">
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="Username"
                                        name="username"
                                        fullWidth
                                        id="username"
                                        label="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={onChangePassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {message && (
                                        <div className="form-group">
                                            <div className={ successful ? "alert alert-success" : "alert alert-danger"}
                                                 role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{backgroundColor: "limegreen"}}
                            >
                                Sign Up !
                            </Button>
                            <Button disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs>
                                    <Link href="#" onClick={handleGuest}>
                                        Continue as Guest
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" onClick={signIn}>
                                        Already have an account?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </div>
    );
};

