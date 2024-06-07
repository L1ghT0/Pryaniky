import React, {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from 'react';
import {login} from "../../store/reducers/authReducer";
import {RootState, useAppDispatch} from "../../store/store";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Login() {

    const navigate = useNavigate();
    const {isAuthorized, error_message} = useSelector((store: RootState) => store.auth);
    useEffect(() => {
        if (isAuthorized) {
            navigate("/")
        }
    }, [isAuthorized])

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login({username, password}))
        clearForm()
    }
    const clearForm = () => {
        // TODO: clearForm
    }
    return (
        <div style={{marginTop: '40px'}}>
            {error_message && <Box component='div' sx={{margin: '0 auto', marginTop: '10px', width: '100px'}}>{error_message}</Box>}
            <Box component='form' onSubmit={handleSubmit}
                 sx={{display: 'flex', flexDirection: 'column', maxWidth: '250px', gap: '20px', margin: '0 auto'}}>
                <TextField
                    error={Boolean(error_message)}
                    label="Username"
                    type="text"
                    variant="standard"
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
                <TextField
                    error={Boolean(error_message)}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    required
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <Button type='submit' value='login'>Login</Button>
            </Box>
        </div>
    );
}

export default Login;
