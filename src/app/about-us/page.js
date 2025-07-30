// src/app/about-us/page.js
import Link from 'next/link';
import '../../styles/about-us.css';
import HeaderComponent from '../../components/Header'; // assuming you have a reusable Header component
import FooterComponent from '../../components/Footer'; // assuming you have a reusable Footer component

export default function AboutUsPage() {
    return (
        <>
            <main className="about-us-page-main">
                <div className="container">

                    <section className="our-story-section section-block">
                        <h2 className="section-title">داستان ما</h2>
                        <div className="story-content">
                            <p>رادیو غبار با شعار "رادیویی برای اقلیت مردم" متولد شد؛ ایده‌ای ساده اما عمیق که از نیاز به شنیده شدن صداهای ناگفته و کمتر شنیده‌شده برخاست. در دنیای پرهیاهوی امروز، بسیاری از دیدگاه‌ها، هنرمندان، و ژانرهای موسیقی در حاشیه قرار می‌گیرند. ماموریت ما پر کردن این خلاء، و ایجاد بستری برای کشف و تجربه محتواهای اصیل و متفاوت است.</p>
                            <p>از همان ابتدا، هدف ما خلق فضایی دوستانه و هنری بود که در آن موسیقی و هنر در کانون توجه قرار گیرند. ما بر این باوریم که هر صدا و هر سلیقه‌ای ارزشمند است و باید فرصت بروز و درخشش داشته باشد. ما تلاش می‌کنیم تا با تولید پادکست‌های عمیق، مصاحبه‌های روشنگر، و معرفی آثار کمتر شناخته‌شده، به رسالت خود یعنی گسترش فرهنگ و هنر کمک کنیم.</p>
                            <p>نام "غبار" نمادی از گذر زمان و حضور همیشگی آنچه کمتر دیده می‌شود اما هرگز از بین نمی‌رود. ما به دنبال گنجینه‌های پنهان در میان هیاهوی روزمره هستیم تا آن‌ها را با شما به اشتراک بگذاریم.</p>
                        </div>
                    </section>

                    <section className="our-team-section section-block">
                        <h2 className="section-title">تیم رادیو غبار</h2>
                        <div className="team-members-grid">
                            <div className="team-member-card">
                                <img src="/assets/images/avatar-default.png" alt="تصویر غبار" className="team-avatar" />
                                <h3 className="member-name">غبار</h3>
                                <p className="member-role">سازنده و میزبان</p>
                                <p className="member-bio">صدایی آشنا در میان غبار، عاشق موسیقی و هنر.</p>
                            </div>
                            <div className="team-member-card">
                                <img src="/assets/images/avatar-default.png" alt="تصویر فرد ۲" className="team-avatar" />
                                <h3 className="member-name">فرد ۲</h3>
                                <p className="member-role">مسئول تولید محتوا</p>
                                <p className="member-bio">متخصص در تحقیق و نگارش اسکریپت اپیزودها.</p>
                            </div>
                            <div className="team-member-card">
                                <img src="/assets/images/avatar-default.png" alt="تصویر فرد ۳" className="team-avatar" />
                                <h3 className="member-name">فرد ۳</h3>
                                <p className="member-role">مدیر ارتباطات</p>
                                <p className="member-bio">رابط بین رادیو غبار و جامعه شنوندگان.</p>
                            </div>
                        </div>
                    </section>

                    <section className="contact-us-section section-block">
                        <h2 className="section-title">با ما در ارتباط باشید</h2>
                        <div className="contact-info">
                            <p>برای هرگونه سوال، پیشنهاد یا همکاری، می‌توانید از طریق ایمیل زیر با ما در تماس باشید:</p>
                            <a href="mailto:contact@radyoghobar.com" className="contact-email-link">contact@radyoghobar.com</a>

                            <p className="social-prompt">ما را در شبکه‌های اجتماعی دنبال کنید:</p>
                            <div className="contact-social-links">
                                <a href="#" className="social-icon-btn"><img src="https://via.placeholder.com/30x30/000000/FFC107?text=F" alt="فیسبوک" /></a>
                                <a href="#" className="social-icon-btn"><img src="https://via.placeholder.com/30x30/000000/FFC107?text=T" alt="توییتر" /></a>
                                <a href="#" className="social-icon-btn"><img src="https://via.placeholder.com/30x30/000000/FFC107?text=I" alt="اینستاگرام" /></a>
                            </div>

                            <h3 className="form-title">ارسال پیام</h3>
                            <form className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="contact-name">نام:</label>
                                    <input type="text" id="contact-name" placeholder="نام شما" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-email">ایمیل:</label>
                                    <input type="email" id="contact-email" placeholder="ایمیل شما" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message">پیام شما:</label>
                                    <textarea id="contact-message" rows="5" placeholder="پیام خود را اینجا بنویسید" required></textarea>
                                </div>
                                <button type="submit" className="send-message-btn cta-button">ارسال پیام</button>
                            </form>
                        </div>
                    </section>

                    <section className="support-cta-section section-block">
                        <p>صدای ما با حمایت شما شنیده می‌شود. برای ادامه راه ما را حمایت کنید.</p>
                        <Link href="#" className="support-us-btn cta-button">حمایت از ما</Link>
                    </section>
                </div>
            </main>

        </>
    );
}