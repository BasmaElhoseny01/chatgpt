// const continueWithGoogle=()

import { EmailFormat } from '../../utils';

export const checkEmail = (emailInput, setEmail) => {
    if (emailInput === '') {
        setEmail(() => ({
            error: true,
            text: 'Please enter an email address to continue',
        }));
        return false;
    } else if (!EmailFormat(emailInput)) {
        setEmail(() => ({
            error: true,
            text: 'Please enter a valid Email!',
        }));
        return false
    } else {
        setEmail(() => ({
            error: false,
            text: '',
            email: emailInput.toLowerCase()
        }));
        return true
    }
};

export const checkPassword = (email, password, setPassword) => {
    if (password === '') {
        setPassword(() => ({
            error: true,
            text: 'Please enter the password to continue',
        }));
        return false;
    } else {
        //Login Endpoint


        const response = false;
        if (response) {
            setPassword(() => ({
                error: false,
                text: '',
                password: password
            }));
        }
        else {
            setPassword(() => ({
                error: true,
                text: 'Incorrect email or password',
                password: password
            }));
        }
        return response;
    }
};


export const responseGoogleFail = (googleResponse) => {
    console.log('Error When Connecting to Google', googleResponse);
};


export const responseGoogleSuccess = (googleResponse) => {
    console.log('Google', googleResponse);
    //Log in with google Endpoints
    // axios.post('/users/google', { tokenId: googleResponse.tokenId }).then((response) => {

};