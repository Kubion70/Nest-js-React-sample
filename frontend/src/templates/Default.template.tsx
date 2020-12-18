import React, {PropsWithChildren} from 'react';
import Button from '@material-ui/core/Button';
import {AppBar, Container, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        cursor: 'pointer',
        flexGrow: 1,
    },
    appBar: {
        marginBottom: theme.spacing(2),
    }
}));

export default function DefaultTemplate(props: PropsWithChildren<any>) {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" onClick={() => history.push('/')}>
                        Sample shop app
                    </Typography>
                    <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    )
}