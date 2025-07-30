// src/app/auth/page.js
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'; // CRITICAL FIX: Import Link
import { useRouter } from 'next/navigation';
import '../../styles/auth.css';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const [loginUsernameEmail, setLoginUsernameEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const router = useRouter();

  const BASE_API_URL = 'http://localhost:8000/api/users/';

  const getCookie = useCallback((name) => {
    if (typeof document === 'undefined') return null;
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }, []);

  const displayMessage = useCallback((text, type = 'info') => {
    setMessage({ text, type });
  }, []);

  const clearMessages = useCallback(() => {
    setMessage({ text: '', type: '' });
  }, []);

  const localizeError = useCallback((errorData) => {
    let messages = [];
    const genericAuthErrorPhrases = [
      "Invalid credentials",
      "Unable to log in with provided credentials",
      "Authentication credentials were not provided"
    ];

    if (typeof errorData === 'string') {
      if (genericAuthErrorPhrases.some(phrase => errorData.toLowerCase().includes(phrase.toLowerCase()))) {
        return 'نام کاربری/ایمیل یا رمز عبور اشتباه است.';
      }
      if (errorData.includes('Authentication credentials were not provided')) {
        return 'شما وارد حساب کاربری خود نشده‌اید. لطفاً ابتدا وارد شوید.';
      }
      messages.push(errorData);
    } else if (typeof errorData === 'object') {
      if (errorData.detail) {
        if (genericAuthErrorPhrases.some(phrase => errorData.detail.toLowerCase().includes(phrase.toLowerCase()))) {
          return 'نام کاربری/ایمیل یا رمز عبور اشتباه است.';
        }
        if (errorData.detail.includes('Authentication credentials were not provided')) {
          return 'شما وارد حساب کاربری خود نشده‌اید. لطفاً ابتدا وارد شوید.';
        }
        messages.push(errorData.detail);
      }

      if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
        errorData.non_field_errors.forEach(err => {
          if (genericAuthErrorPhrases.some(phrase => err.toLowerCase().includes(phrase.toLowerCase()))) {
            messages.push('نام کاربری/ایمیل یا رمز عبور اشتباه است.');
          } else if (err.includes('The two password fields didn\'t match') || err.includes('do not match')) {
            messages.push('رمز عبور و تکرار آن یکسان نیستند.');
          } else {
            messages.push(err);
          }
        });
      }

      for (const field in errorData) {
        if (Array.isArray(errorData[field])) {
          errorData[field].forEach(errorText => {
            let localizedMessage = '';
            const lowerCaseError = errorText.toLowerCase();

            switch (field) {
              case 'username':
                if (lowerCaseError.includes('required')) localizedMessage = 'نام کاربری نمی‌تواند خالی باشد.';
                else if (lowerCaseError.includes('already exists')) localizedMessage = 'این نام کاربری قبلاً توسط شخص دیگری استفاده شده است.';
                else if (lowerCaseError.includes('max_length')) localizedMessage = `نام کاربری نباید بیشتر از ${errorText.match(/\d+/) ? errorText.match(/\d+/)[0] : ''} کاراکتر باشد.`;
                else localizedMessage = `نام کاربری: ${errorText}`;
                break;
              case 'email':
                if (lowerCaseError.includes('required')) localizedMessage = 'ایمیل نمی‌تواند خالی باشد.';
                else if (lowerCaseError.includes('valid email address')) localizedMessage = 'لطفاً یک آدرس ایمیل معتبر وارد کنید.';
                else if (lowerCaseError.includes('already exists')) localizedMessage = 'این ایمیل قبلاً ثبت نام شده است.';
                else localizedMessage = `ایمیل: ${errorText}`;
                break;
              case 'password':
                if (lowerCaseError.includes('required')) localizedMessage = 'رمز عبور نمی‌تواند خالی باشد.';
                else if (lowerCaseError.includes('too short') || lowerCaseError.includes('must contain at least')) localizedMessage = 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
                else if (lowerCaseError.includes('common password')) localizedMessage = 'این رمز عبور بسیار رایج است. لطفاً رمز قوی‌تری انتخاب کنید.';
                else if (lowerCaseError.includes('numeric only')) localizedMessage = 'رمز عبور نباید فقط شامل اعداد باشد.';
                else if (lowerCaseError.includes('similar to your username') || lowerCaseError.includes('similar to the username')) localizedMessage = 'رمز عبور نباید شبیه نام کاربری شما باشد.';
                else if (lowerCaseError.includes('invalid password')) localizedMessage = 'رمز عبور باید شامل حروف بزرگ و کوچک، اعداد و نمادها باشد.';
                else localizedMessage = `رمز عبور: ${errorText}`;
                break;
              case 'password2':
                if (lowerCaseError.includes('required')) localizedMessage = 'تکرار رمز عبور نمی‌تواند خالی باشد.';
                else if (lowerCaseError.includes('didn\'t match') || lowerCaseError.includes('do not match')) localizedMessage = 'رمز عبور و تکرار آن یکسان نیستند.';
                else localizedMessage = `تکرار رمز عبور: ${errorText}`;
                break;
              case 'username_or_email':
                if (lowerCaseError.includes('required')) localizedMessage = 'نام کاربری یا ایمیل نمی‌تواند خالی باشد.';
                else localizedMessage = `نام کاربری/ایمیل: ${errorText}`;
                break;
              default:
                localizedMessage = `${field}: ${errorText}`;
                break;
            }
            messages.push(localizedMessage);
          });
        }
      }
    }

    if (messages.length === 0) {
      console.error('Unhandled API Error Structure:', errorData);
      return 'خطا در عملیات. لطفاً دوباره تلاش کنید.';
    } else if (messages.length === 1 && messages[0].includes('خطا:') && messages[0].length < 15) {
      return 'خطا در عملیات. لطف به اتصال اینترنت خود را بررسی کنید';
    }

    const uniqueMessages = [...new Set(messages)];
    return uniqueMessages.join('\n- ');
  }, []);

  const handleRegister = useCallback(async (event) => {
    event.preventDefault();
    clearMessages();
    setLoading(true);

    if (signupPassword !== signupConfirmPassword) {
      displayMessage('رمز عبور و تکرار آن یکسان نیستند.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_API_URL}register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
          password2: signupConfirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        displayMessage('ثبت نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.', 'success');
        setSignupUsername('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setTimeout(() => {
          setActiveTab('login');
          setLoginUsernameEmail(signupUsername);
          clearMessages();
        }, 2000);
      } else {
        const errorMessage = localizeError(data);
        displayMessage(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      displayMessage('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.', 'error');
    } finally {
      setLoading(false);
    }
  }, [signupUsername, signupEmail, signupPassword, signupConfirmPassword, getCookie, displayMessage, clearMessages, localizeError]);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    clearMessages();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_API_URL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({
          username_or_email: loginUsernameEmail,
          password: loginPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        displayMessage('ورود با موفقیت انجام شد! به داشبورد خود هدایت می‌شوید.', 'success');
        localStorage.setItem('isLoggedIn', 'true');
        setLoginUsernameEmail('');
        setLoginPassword('');
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } else {
        const errorMessage = localizeError(data);
        displayMessage(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Error during login:', error);
      displayMessage('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.', 'error');
    } finally {
      setLoading(false);
    }
  }, [loginUsernameEmail, loginPassword, getCookie, displayMessage, clearMessages, localizeError, router]);

  const handleLogout = useCallback(async () => {
    clearMessages();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_API_URL}logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
      });

      if (response.ok) {
        displayMessage('شما با موفقیت از حساب کاربری خود خارج شدید.', 'success');
        localStorage.removeItem('isLoggedIn');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        const errorData = await response.json();
        const errorMessage = localizeError(errorData);
        displayMessage(`خطا در خروج: ${errorMessage}`, 'error');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      displayMessage('خطا در ارتباط با سرور هنگام خروج. لطفاً دوباره تلاش کنید.', 'error');
    } finally {
      setLoading(false);
    }
  }, [getCookie, displayMessage, clearMessages, localizeError, router]);

  return (
    <main className="auth-page-main">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); clearMessages(); }}
            data-form="login"
            disabled={loading}
          >
            ورود
          </button>
          <button
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signup'); clearMessages(); }}
            data-form="signup"
            disabled={loading}
          >
            ثبت نام
          </button>
        </div>

        <div className={`message-area ${message.text ? (message.type === 'success' ? 'message-success' : 'message-error') : ''}`}
             style={{ display: message.text ? 'block' : 'none' }}>
          {message.text}
        </div>

        {/* Login Form */}
        <form
          className={`auth-form login-form ${activeTab === 'login' ? 'active' : ''}`}
          id="login-form"
          onSubmit={handleLogin}
        >
          <div className="form-group">
            <label htmlFor="login-username-email">نام کاربری یا ایمیل:</label>
            <input
              type="text"
              id="login-username-email"
              placeholder="نام کاربری یا ایمیل خود را وارد کنید"
              value={loginUsernameEmail}
              onChange={(e) => setLoginUsernameEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">رمز عبور:</label>
            <input
              type="password"
              id="login-password"
              placeholder="رمز عبور خود را وارد کنید"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <Link href="/forgot-password" className="forgot-password-link">رمز عبور را فراموش کرده‌ام؟</Link>
          <button type="submit" className="auth-submit-btn cta-button" disabled={loading}>
            {loading && activeTab === 'login' ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>

        {/* Signup Form */}
        <form
          className={`auth-form signup-form ${activeTab === 'signup' ? 'active' : ''}`}
          id="signup-form"
          onSubmit={handleRegister}
        >
          <div className="form-group">
            <label htmlFor="signup-username">نام کاربری:</label>
            <input
              type="text"
              id="signup-username"
              placeholder="یک نام کاربری انتخاب کنید"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">ایمیل:</label>
            <input
              type="email"
              id="signup-email"
              placeholder="ایمیل خود را وارد کنید"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">رمز عبور:</label>
            <input
              type="password"
              id="signup-password"
              placeholder="رمز عبور خود را وارد کنید"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="signup-confirm-password">تکرار رمز عبور:</label>
            <input
              type="password"
              id="signup-confirm-password"
              placeholder="رمز عبور را تکرار کنید"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="auth-submit-btn cta-button" disabled={loading}>
            {loading && activeTab === 'signup' ? 'در حال ثبت‌نام...' : 'ثبت نام'}
          </button>
        </form>
      </div>
    </main>
  );
}