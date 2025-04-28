import './ContactPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactInfo  from '../components/ContactInfo'
import ContactHeader from '../components/ContactHeader';
import ContactMap from '../components/ContactMap';

const ContactPage = () => {
    return (
        <>
            <Header />
            <main className='contact'>
                <ContactHeader />

                <section className="contact-body">
                    <ContactInfo />

                    <div className="contact-map">

                        <ContactMap />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ContactPage;