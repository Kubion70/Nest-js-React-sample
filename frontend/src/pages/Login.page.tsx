import React, {FormEvent, useState} from 'react';
import Button from '@material-ui/core/Button';
import {
    Avatar,
    Container,
    CssBaseline,
    Grid, Link, makeStyles, Snackbar,
    TextField,
    Typography
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {ILogin} from "../interfaces/login.interface";
import axios from "axios";
import {trackPromise} from "react-promise-tracker";

const useStyles = makeStyles((theme: any) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginPage() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success' as "success" | "error" | "info" | "warning" | undefined);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const model: ILogin = {
            username,
            password
        };

        axios.post('/auth/login', model).then((result) => {
            window.localStorage.setItem('access_token', result.data.access_token);
        }).catch((error) => {
            setSnackBarSeverity('error');
            setSnackBarMessage('Wrong username or password');
            setShowSnackBar(true);
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={() => setShowSnackBar(false)}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowSnackBar(false)} severity={snackBarSeverity}>
                    {snackBarMessage}
                </MuiAlert>
            </Snackbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}