
import { EmailFormat, redirectHome, redirectLogin } from '../utils';
// services
import axios from '../services/instance';

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

export const checkPassword = (password) => {
    if (password.length < 8) {
        return false;
    }
    return true;

}

export const logIn = (email, password, setPassword) => {
    let response;
    if (password === '') {
        setPassword(() => ({
            error: true,
            text: 'Please enter the password to continue',
        }));
        return false;
    } else {
        axios.post('/users/login', { email: email, password: password }).then((res) => {
            setPassword(() => ({
                error: false,
                text: '',
                password: password
            }));
            redirectHome();

            return true//not used :(
        }).catch((error) => {
            if (error.response.status === 404) {
                if (error.response.data.errorMessage === "User Not Found") {
                    setPassword(() => ({
                        error: true,
                        text: 'This user doesn\'t exist',
                    }));
                }
            }
            else if (error.response.status === 400) {
                if (error.response.data.errorMessage === "Incorrect Password") {
                    setPassword(() => ({
                        error: true,
                        text: 'Incorrect email or password',
                    }));
                }
            }
            else {
                setPassword(() => ({
                    error: true,
                    text: "Error when creating account",
                    password: password
                }));
            }
            return false;
        })
        return response;
    }
};

export const signUp = (email, password, setPassword) => {
    if (password === '') {
        setPassword(() => ({
            error: true,
            text: 'Please enter the password to continue',
        }));
        return false;
    } else {
        // SigUp Endpoint
        axios.post('/users/signup', { email: email, password: password }).then((res) => {
            setPassword(() => ({
                error: false,
                text: '',
                password: password
            }));
            redirectHome();

            return true//not used :(
        }).catch((error) => {
            if (error.response.status === 400) {
                if (error.response.data.errorMessage === "Too weak password" || error.response.data.errorMessage === "Weak password") {
                    setPassword(() => ({
                        error: true,
                        text: 'Too weak password Enter Capital and Small letters and symbol and numbers',
                    }));
                }
                else if (error.response.data.errorMessage === "User Already Exists") {
                    setPassword(() => ({
                        error: true,
                        text: 'This user already exists',
                    }));
                }
            }
            else {
                setPassword(() => ({
                    error: true,
                    text: "Error when creating account",
                    password: password
                }));
            }
            return false;
        })
    }
};


export const logOut = () => {
    axios.post('/users/logout').then((res) => {
        redirectLogin();
    }).catch((error) => {

    })
};


export const responseGoogleFail = (googleResponse) => {
    console.log('Error When Connecting to Google', googleResponse);
};


export const responseGoogleSuccess = (googleResponse) => {
    console.log('Google', googleResponse);
    //Log in with google Endpoints
    axios.post('/users/google', { tokenId: googleResponse.tokenId }).then((response) => {
        redirectHome();
    })
        .catch((error) => {
            console.log("Error", error)
            return false;
        })
    return true;

};