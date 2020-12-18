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
import CreateIcon from '@material-ui/icons/Create';
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import {IRegister} from "../interfaces/register.interface";

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

export default function RegisterPage() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarSeverity, setSnackBarSeverity] = useState('success' as "success" | "error" | "info" | "warning" | undefined);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const model: IRegister = {
            username,
            password,
            firstName,
            lastName
        };

        axios.post('/users', model).then(() => {
            axios.post('/auth/login', model).then((result) => {
                window.localStorage.setItem('access_token', result.data.access_token);
            }).catch((error) => {
                setSnackBarSeverity('error');
                setSnackBarMessage('Something went wrong. Check the form.');
                setShowSnackBar(true);
            });
        }).catch((error) => {
            setSnackBarSeverity('error');
            setSnackBarMessage('Something went wrong. Check the form.');
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
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name="firstName"
                        label="First Name"
                        type="text"
                        id="firstName"
                        autoComplete="first-name"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name="lastName"
                        label="Last Name"
                        type="text"
                        id="lastName"
                        autoComplete="last-name"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Login!"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}