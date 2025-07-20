// src/app/forgot-password/page.js
'use client'; // This component will have client-side interactivity (form submission)

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'; // For navigation
import { useRouter } from 'next/navigation'; // For redirection

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize router for redirection

  const BASE_API_URL = 'http://localhost:8000/api/users/'; // Your API base URL (assuming it's the same)

  // Helper function to get CSRF token from cookies (re-used from auth.html)
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

  // Function to display messages (adapted from auth.html)
  const displayMessage = useCallback((text, type = 'info') => {
    setMessage({ text, type });
    // You might want to auto-clear messages after some time
    // setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  }, []);

  // Function to clear messages
  const clearMessages = useCallback(() => {
    setMessage({ text: '', type: '' });
  }, []);

  // Function to localize and simplify error messages (adapted from auth.html)
  const localizeError = useCallback((errorData) => {
    let messages = [];
    const methodNotAllowedPattern = /method.*not allowed/i;
    const genericErrorPatterns = {
      "not found": "کاربری با این ایمیل یافت نشد.",
      "no user": "کاربری با این ایمیل یافت نشد.",
      "rate limit": "شما بیش از حد مجاز درخواست ارسال کرده‌اید. لطفاً کمی بعد دوباره تلاش کنید.",
      "required": "این فیلد نمی‌تواند خالی باشد.",
      "valid email address": "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
    };

    const checkAndAddMessage = (text) => {
      if (methodNotAllowedPattern.test(text)) {
        messages.push('این عملیات مجاز نیست. لطفاً با پشتیبانی تماس بگیرید.');
        return true;
      }
      for (const [pattern, localized] of Object.entries(genericErrorPatterns)) {
        if (text.toLowerCase().includes(pattern)) {
          messages.push(localized);
          return true;
        }
      }
      return false;
    };

    if (typeof errorData === 'string') {
      if (!checkAndAddMessage(errorData)) {
        messages.push(errorData);
      }
    } else if (typeof errorData === 'object') {
      if (errorData.detail) {
        if (!checkAndAddMessage(errorData.detail)) {
          messages.push(errorData.detail);
        }
      }
      if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
        errorData.non_field_errors.forEach(err => {
          if (!checkAndAddMessage(err)) {
            messages.push(err);
          }
        });
      }
      for (const field in errorData) {
        if (Array.isArray(errorData[field])) {
          errorData[field].forEach(errorText => {
            let localizedFieldMessage = '';
            const lowerCaseError = errorText.toLowerCase();
            switch (field) {
              case 'email':
                if (lowerCaseError.includes('required')) localizedFieldMessage = 'ایمیل نمی‌تواند خالی باشد.';
                else if (lowerCaseError.includes('valid email address')) localizedFieldMessage = 'لطفاً یک آدرس ایمیل معتبر وارد کنید.';
                else if (lowerCaseError.includes('not found') || lowerCaseError.includes('no user')) localizedFieldMessage = 'کاربری با این ایمیل یافت نشد.';
                else if (lowerCaseError.includes('rate limit')) localizedFieldMessage = 'شما بیش از حد مجاز درخواست ارسال کرده‌اید. لطفاً کمی بعد دوباره تلاش کنید.';
                else localizedFieldMessage = `ایمیل: ${errorText}`;
                break;
              default:
                localizedFieldMessage = `${field}: ${errorText}`;
                break;
            }
            messages.push(localizedFieldMessage);
          });
        }
      }
    }

    if (messages.length === 0) {
      console.error('Unhandled API Error Structure:', errorData);
      return 'خطا در عملیات. لطفاً دوباره تلاش کنید.';
    }
    const uniqueMessages = [...new Set(messages)];
    if (uniqueMessages.length === 1 && uniqueMessages[0].includes('خطا:') && uniqueMessages[0].length < 15) {
        return 'خطا در عملیات. لطف به اتصال اینترنت خود را بررسی کنید';
    }
    return uniqueMessages.join('\n- ');
  }, []);


  // Form Submission Handler
  const handleForgotPassword = useCallback(async (event) => {
    event.preventDefault();
    clearMessages();
    setLoading(true);

    if (!email) {
      displayMessage('لطفاً آدرس ایمیل خود را وارد کنید.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_API_URL}password_reset/`, { // Placeholder URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        displayMessage('لینک بازنشانی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی خود را بررسی کنید.', 'success');
        setEmail(''); // Clear form on success
      } else {
        const errorMessage = localizeError(data);
        displayMessage(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Error during password reset request:', error);
      displayMessage('خطا در ارتباط با سرور. لطفاً اتصال اینترنت خود را بررسی کنید.', 'error');
    } finally {
      setLoading(false);
    }
  }, [email, getCookie, displayMessage, clearMessages, localizeError]);


  return (
    <main className="forgot-password-page-main"> {/* Main wrapper from index.html */}
      <div className="auth-container"> {/* Container for the form, from index.html */}
        <h1 className="page-title">بازنشانی رمز عبور</h1> {/* Title from index.html */}

        {/* Message Area */}
        <div className={`message-area ${message.type === 'success' ? 'message-success' : message.type === 'error' ? 'message-error' : ''}`}
             style={{ display: message.text ? 'block' : 'none' }}>
          {message.text}
        </div>

        <p className="instructional-text">لطفاً ایمیل خود را وارد کنید تا لینک بازنشانی رمز عبور برای شما ارسال شود.</p>

        {/* Forgot Password Form */}
        <form
          className="auth-form" // Common form class
          id="forgot-password-form"
          onSubmit={handleForgotPassword}
        >
          <div className="form-group">
            <label htmlFor="email-input">ایمیل:</label>
            <input
              type="email"
              id="email-input"
              placeholder="آدرس ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="auth-submit-btn cta-button" disabled={loading}>
            {loading ? 'در حال ارسال...' : 'ارسال لینک بازنشانی'}
          </button>
        </form>

        {/* Link back to Login page */}
        <Link href="/auth" className="back-to-login-link">بازگشت به ورود</Link>
      </div>
    </main>
  );
}