import React, { useState } from 'react'

import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
//Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';

import Divider from './Divider/Divider'

//Google
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import ThirdPartyButton from './ThirdPartyButton/ThirdPartyButton'


//styles 
import { AuthenticationContainer, Image, StyledLink } from './styles'

//assets
import chatGPT from '../assets/ChatGPT.png'
import Google from '../assets/google.png'


//server
import { checkEmail, checkPassword, logIn, signUp, responseGoogleSuccess, responseGoogleFail } from './server'
import { redirectHome } from '../utils';
import PasswordRules from './PasswordRules/PasswordRules';

//env Var
const { REACT_APP_GOOGLECLIENTID } = process.env;


function Authentication(props) {
    //props
    const { login } = props
    //use States
    const [view, setView] = useState(1);
    const [email, setEmail] = useState({ email: "", error: false, text: "" });
    const [password, setPassword] = useState({ password: "", error: false, text: "" });
    const [showPassword, setShowPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState({ show: false, state: false })


    const initClient = () => {
        gapi.auth2.init({
            clientId: REACT_APP_GOOGLECLIENTID,
            scope: '',
        });
    };
    gapi.load('client:auth2', initClient);

    return (
        <AuthenticationContainer>
            <Image src={chatGPT} />
            {view === 1 ?
                <>
                    <Typography
                        variant='h4'
                        fontSize='32px'
                        fontWeight="bold"
                        sx={{ marginTop: "100px !important" }}
                    >
                        {login ? <>Welcome Back</> : <>Create your account</>}
                    </Typography>
                    <TextField label="Email address" variant="outlined" fullWidth={true} sx={{ height: '50px', margin: "15px" }}
                        value={email.email}
                        error={email.error}
                        helperText={email.text}
                        onChange={(e) => {
                            setEmail((prevState) => ({
                                ...prevState,
                                email: e.target.value
                            }));
                        }}
                    />
                    <Button variant="contained" fullWidth={true} sx={{ margin: "15px" }} onClick={() => {
                        if (checkEmail(email.email, setEmail)) {
                            setView(2)
                        }
                    }}>Continue</Button>
                    <Typography variant='p'>
                        {login ? <>Don't have an account?<StyledLink href="../#/signup">Sign up</StyledLink></>
                            : <>Already have an account?<StyledLink href="../#/login">Log in</StyledLink></>}
                    </Typography>

                    <Divider />
                    <GoogleLogin
                        render={renderProps => (
                            <ThirdPartyButton onClick={renderProps.onClick} img={Google} alt="Google" txt="continue with google" />
                        )}
                        clientId={REACT_APP_GOOGLECLIENTID}
                        onSuccess={(googleResponse) => responseGoogleSuccess(googleResponse)}
                        onFailure={responseGoogleFail}
                        cookiePolicy="single_host_origin"
                    />
                </> :
                <>
                    <Typography
                        variant='h4'
                        fontSize='32px'
                        fontWeight="bold"
                        sx={{ marginTop: "100px !important", marginBottom: "10px" }}
                    >
                        Enter your password
                    </Typography>

                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined"
                        disabled
                    >
                        <InputLabel htmlFor="outlined-adornment-password">{email.email}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setView(1)}
                                        edge="end"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText id="component-error-text" error={password.error}>{password.text}</FormHelperText>
                    </FormControl>


                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined"
                        error={password.error}
                        helperText={password.text}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            value={password.password}
                            onChange={(e) => {
                                setPassword((prevState) => ({
                                    ...prevState,
                                    password: e.target.value
                                }));

                                setPasswordStrength(() => ({
                                    show: true,
                                    state: checkPassword(e.target.value)
                                }));
                            }
                            }
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText id="component-error-text" error={password.error}>{password.text}</FormHelperText>
                    </FormControl>


                    {login ? null : passwordStrength.show ? <PasswordRules valid={passwordStrength.state} /> : null}


                    <Button variant="contained" fullWidth={true} sx={{ margin: "15px" }} onClick={() => {
                        login ? logIn(email.email, password.password, setPassword) : signUp(email.email, password.password, setPassword)
                    }}>Continue</Button>

                    <Typography variant='p'>
                        {login ? <>Don't have an account?<StyledLink href="../signup">Sign up</StyledLink></>
                            : <>Already have an account?<StyledLink href="../login">Log in</StyledLink></>}
                    </Typography>

                </>
            }
        </AuthenticationContainer >
    )
}
export default Authentication