// src/app/support/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../../styles/support.css';

const faqItems = [
  {
    question: 'سوال ۱: چگونه می‌توانم از رادیو غبار حمایت کنم؟',
    answer: 'پاسخ: شما می‌توانید با انتخاب یکی از مبالغ پیش‌فرض یا وارد کردن مبلغ دلخواه خود در فیلد مربوطه، از طریق درگاه پرداخت آنلاین، به راحتی از رادیو غبار حمایت مالی کنید. پس از انتخاب مبلغ، روی دکمه "حمایت می‌کنم" کلیک کنید تا به صفحه پرداخت منتقل شوید.',
  },
  {
    question: 'سوال ۲: کمک‌های مالی من صرف چه مواردی می‌شود؟',
    answer: 'پاسخ: تمامی حمایت‌های مالی شما مستقیماً صرف هزینه‌های تولید محتوا (تحقیق، نگارش، ضبط و ویرایش)، نگهداری سرورها و پلتفرم پخش، و توسعه آینده رادیو غبار می‌شود تا بتوانیم کیفیت و استقلال خود را حفظ کنیم.',
  },
  {
    question: 'سوال ۳: آیا حمایت مالی مزایایی برای من دارد؟',
    answer: 'پاسخ: در حال حاضر، حمایت‌های مالی شما به صورت داوطلبانه و برای کمک به بقای رادیو غبار است. اما ما برای حامیان خود امتیازات وفاداری در نظر می‌گیریم که می‌توانید از آنها در بخش‌های مختلف وب‌سایت استفاده کنید. جزئیات بیشتر در بخش "امتیازات وفاداری" پروفایل شما قابل مشاهده است.',
  },
];

export default function SupportPage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const handlePresetAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value);
  };

  const handleFaqClick = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <>
      <main className="support-page-main">
        <div className="container">
          <section className="encouragement-section">
            <p>صدای ما با حمایت شما شنیده می‌شود. رادیو غبار متعهد به تولید محتوای فرهنگی و هنری مستقل و باکیفیت است که بدون سانسور و با نگاهی عمیق به مسائل اقلیت جامعه می‌پردازد. با حمایت‌های مالی خود، به ما در ادامه این مسیر یاری رسانید. هر کمک مالی، هرچند کوچک، برای ما ارزشمند است.</p>
            <p>حمایت شما به ما کمک می‌کند تا هزینه‌های تولید، میزبانی و توسعه را پوشش دهیم و همچنان به عنوان یک صدای مستقل در کنار شما باشیم. از اعتماد و همراهی شما سپاسگزاریم.</p>
          </section>
          <section className="donation-options">
            <h2 className="section-subtitle">مبلغ حمایت خود را انتخاب کنید</h2>
            <div className="preset-amounts">
              <button
                className={`amount-btn ${selectedAmount === 50000 ? 'active' : ''}`}
                onClick={() => handlePresetAmountClick(50000)}
                data-amount="50000"
              >
                ۵۰,۰۰۰ تومان
              </button>
              <button
                className={`amount-btn ${selectedAmount === 100000 ? 'active' : ''}`}
                onClick={() => handlePresetAmountClick(100000)}
                data-amount="100000"
              >
                ۱۰۰,۰۰۰ تومان
              </button>
              <button
                className={`amount-btn ${selectedAmount === 200000 ? 'active' : ''}`}
                onClick={() => handlePresetAmountClick(200000)}
                data-amount="200000"
              >
                ۲۰۰,۰۰۰ تومان
              </button>
              <button
                className={`amount-btn ${selectedAmount === 500000 ? 'active' : ''}`}
                onClick={() => handlePresetAmountClick(500000)}
                data-amount="500000"
              >
                ۵۰۰,۰۰۰ تومان
              </button>
            </div>
            <div className="custom-amount-group">
              <input
                type="number"
                id="custom-amount"
                placeholder="مبلغ دلخواه (تومان)..."
                min="1000"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
              <span className="currency-label">تومان</span>
            </div>
            <button className="support-btn cta-button">حمایت می‌کنم</button>
            <p className="payment-methods">پرداخت از طریق درگاه‌های پرداخت آنلاین (زرین‌پال، کارت شتاب)</p>
          </section>
          <section className="top-supporters-section">
            <h2 className="section-subtitle">حامیان برتر</h2>
            <ul className="supporters-list">
              <li>کاربر @Amir <span className="donation-amount">(۱,۰۰۰,۰۰۰ تومان)</span></li>
              <li>کاربر @Sara <span className="donation-amount">(۵۰۰,۰۰۰ تومان)</span></li>
              <li>کاربر @Reza <span className="donation-amount">(۳۰۰,۰۰۰ تومان)</span></li>
              <li>کاربر @Nika <span className="donation-amount">(۲۵۰,۰۰۰ تومان)</span></li>
              <li>کاربر @Ali <span className="donation-amount">(۲۰۰,۰۰۰ تومان)</span></li>
              <li>کاربر @Zahra <span className="donation-amount">(۱۵۰,۰۰۰ تومان)</span></li>
              <li>کاربر @Mehran <span className="donation-amount">(۱۰۰,۰۰۰ تومان)</span></li>
            </ul>
          </section>

          <section className="support-faq-section">
            <h2 className="section-subtitle">سوالات متداول</h2>
            <div className="faq-items">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${activeFaqIndex === index ? 'active' : ''}`}
                    onClick={() => handleFaqClick(index)}
                  >
                    {item.question}
                  </button>
                  <div className={`faq-answer ${activeFaqIndex === index ? 'active' : ''}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}