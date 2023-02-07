import React from 'react';
import icon from '../assets/right-arrow.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReCAPTCHA from 'react-google-recaptcha';

const formStyle = {
  border: '2px solid #ff0066',
  borderRadius: '15px',
  display: 'flex',
  padding: '5px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '15px',
  marginRight: '10px',
  border: 'none',
  outline: 'none',
  flexGrow: 9,
};

const btnStyle = {
  padding: '15px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#ff0066',
  color: 'white',
  fontSize: '15px',
  flexGrow: '1',
  cursor: 'pointer',
};

const iconStyle = {
  width: '0.8em',
  display: 'inline',
  position: 'relative',
  top: '0.1em',
  color: '#FFF',
  marginLeft: '5px',
};

const Form = () => {
  const [email, setEmail] = React.useState('');

  const recaptchaRef = React.useRef();
  const formRef = React.useRef();

  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  function validateEmail(email) {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }

  const validateSubmit = async (event) => {
    event.preventDefault();

    if (email === '' || !validateEmail(email)) {
      toast.error('Please enter a valid email', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    recaptchaRef.current
      .execute()
      .then((token) => {
        console.log('Got token');
      })
      .catch((err) => {
        console.log(err);
        recaptchaRef.current.reset();
      });
  };

  const handleSubmit = () => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': formRef.current.name,
        email: email,
      }),
    })
      .then(() =>
        toast.success('Thanks for joining us!', {
          position: toast.POSITION.TOP_CENTER,
        })
      )
      .catch((error) =>
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
        })
      );

    recaptchaRef.current.reset();
  };

  return (
    <form
      name='email-submission'
      ref={formRef}
      style={formStyle}
      onSubmit={(e) => validateSubmit(e)}
      data-netlify='true'
      data-netlify-honeypot='bot-field'>
      <input type='hidden' name='form-name' value='email-submission' />
      <input
        style={inputStyle}
        type='email'
        placeholder='Your email address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button style={btnStyle} type='submit'>
        Join <img style={iconStyle} src={icon} />
      </button>
      <ReCAPTCHA
        ref={recaptchaRef}
        size='invisible'
        sitekey={import.meta.env.PUBLIC_SITE_KEY}
        badge='bottomright'
        onChange={() => handleSubmit()}
      />
      <ToastContainer />
    </form>
  );
};

export default Form;
