import './ContactPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ContactInfo  from '../../components/ContactInfo/ContactInfo'
import ContactHeader from '../../components/ContactHeader/ContactHeader';
import ContactMap from '../../components/ContactMap/ContactMap';

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