import React, { useState, useEffect } from 'react';
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import Spinner from './Spinner';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase.config';

const Login = () => {
    const [otp, setOtp] = useState("");
    const [showotp, setShowotp] = useState(false);
    const [ph, setPh] = useState("");
    const [loader, setLoader] = useState(false);
    const [user,setUser] = useState(false)

    useEffect(() => {
        initializeRecaptcha();
    }, []);

    const initializeRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        // Callback function
                    },
                    "expired-callback": () => {
                        // Expired callback
                    },
                },
                auth
            );
        }
    };

    const onSignup = () => {
        setLoader(true);

        const formatPh = "+" + ph;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoader(false);
                setShowotp(true);
            })
            .catch((error) => {
                console.error("Error sending OTP:", error);
                setLoader(false);
            });
    };

    const onOTPVerify = () => {
        setLoader(true);
        window.confirmationResult
            .confirm(otp)
            .then((res) => {
                console.log(res.user.uid);
                setLoader(false);
                setUser(true)

            })
            .catch((err) => {
                console.error("Error verifying OTP:", err);
                setLoader(false);
            });
    };

    return (
        <div className='logincontainer'>
            <div id="recaptcha-container"></div>
        {user ?( <h1>Login successfully 👍</h1>):(<>
            <h1>Firebase Phone OTP verification</h1>
           

            {showotp ? (
                <>
                    <label htmlFor="otp">Enter your OTP</label>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="otp-container"
                    />
                    <button onClick={onOTPVerify} className='logincontainer-btn'>
                        {loader && <Spinner />}
                        <span>Verify your OTP</span>
                    </button>
                </>
            ) : (
                <>
                    <label htmlFor="otp">Enter your Phone number</label>
                    <PhoneInput country={"in"} value={ph} onChange={setPh} className="phone" />

                    <button className='logincontainer-btn' onClick={onSignup}>
                        {loader && <Spinner />}
                        <span>Send OTP to your Number</span>
                    </button>
                </>
            )}
            </>)  }
         
        </div>
    );
};

export default Login;
