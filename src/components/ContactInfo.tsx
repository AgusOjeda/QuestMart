import './ContactInfo.css';
import { MailIcon, ClockIcon, MapPinIcon, WhatsAppIcon } from './icons.tsx'; 

const ContactInfo = () => {
    return (
        <div className="contact-info">
            <h2>Información de Contacto</h2>

            <div className="contact-info-item">
                <MailIcon className="icon" />
                <span>contacto@questmart.com</span>
            </div>

            <div className="contact-info-item">
                <ClockIcon className="icon" />
                <span>Lunes a Viernes de 9:00 a 18:00</span>
            </div>

            <div className="contact-info-item">
                <WhatsAppIcon className="icon" />
                <span>Whatsapp: +54 9 11 1234 5678</span>
            </div>

            <div className="contact-info-item">
                <MapPinIcon className="icon" />
                <span>Calle 14 entre Avenida 51 y 53, La Plata, Buenos Aires</span>
            </div>
        </div>
    );
};

export default ContactInfo;
