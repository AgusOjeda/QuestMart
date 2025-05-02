import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SharePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import ConfirmAlert from '../../components/Alerts/ConfirmAlert';
import error from '../../assets/error.png';

const SharePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const game = location.state?.game;

    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [message, setMessage] = useState('');

    const [senderError, setSenderError] = useState('');
    const [receiverError, setReceiverError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    //Validaciones para ambos correos

    const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSenderEmail(value);

        if (!value) {
            setSenderError('El correo emisor es obligatorio.');
        } else if (!validateEmail(value)) {
            setSenderError('El formato del correo emisor no es válido.');
        } else {
            setSenderError('');
        }
    };

    const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setReceiverEmail(value);

        if (!value) {
            setReceiverError('El correo destinatario es obligatorio.');
        } else if (!validateEmail(value)) {
            setReceiverError('El formato del correo destinatario no es válido.');
        } else {
            setReceiverError('');
        }
    };

    //Se chequea si son validos los correos al enviar

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;

        if (!senderEmail) {
            setSenderError('El correo emisor es obligatorio.');
            valid = false;
        } else if (!validateEmail(senderEmail)) {
            setSenderError('El formato del correo emisor no es válido.');
            valid = false;
        }

        if (!receiverEmail) {
            setReceiverError('El correo destinatario es obligatorio.');
            valid = false;
        } else if (!validateEmail(receiverEmail)) {
            setReceiverError('El formato del correo destinatario no es válido.');
            valid = false;
        }

        if (!valid) return;

        const subject = `¡Mirá este juego: ${game.name}!`;
        const body = `Tu amig@ (${senderEmail}) quiere compartirte este juego que le parecio interesante!
            - Nombre: ${game.name}
            - Precio: $${game.cheapestPrice || '0.00'}
            - Nota: ${game.rating.toFixed(1)} / 5
            - Plataformas: ${game.platforms.map((p: { platform: { name: string } }) => p.platform.name).join(', ')}
            - Fecha de lanzamiento: ${new Date(game.released).toLocaleDateString()}

            -------------------------------------------------------------------------------------------------------

            Mensaje adicional de ${senderEmail}:
            ${message}

            `;
        window.location.href = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setShowSuccessModal(true);

    };
    return (
        <>
            <Header />
            <main className="share-page">
                {!game ? (
                    <div className="error-container">
                        <img src={error} alt="error404" className="error-image" />
                        <div className="error">No se recibieron los datos del juego para compartir.</div>
                    </div>
                ) : (
                    <>
                        <h2>Compartir con un amigo</h2>
                        <hr />
                        <h3>Datos</h3>
                        <div className="shared-game-info">
                            <p><strong>Nombre:</strong> {game.name}</p>
                            <p><strong>Precio:</strong> ${game.cheapestPrice || '0.00'}</p>
                            <p><strong>Nota:</strong> {game.rating.toFixed(1)} / 5</p>
                            <p><strong>Fecha de lanzamiento:</strong> {new Date(game.released).toLocaleDateString()}</p>
                        </div>
                        <hr />

                        <form onSubmit={handleSend} className="share-form">
                            <label>
                                Correo emisor:
                                <input
                                    type="email"
                                    value={senderEmail}
                                    onChange={handleSenderChange}
                                    className={senderError ? 'input-error' : ''}
                                />
                                {senderError && <p className="error-message">{senderError}</p>}
                            </label>

                            <label>
                                Correo destinatario:
                                <input
                                    type="email"
                                    value={receiverEmail}
                                    onChange={handleReceiverChange}
                                    className={receiverError ? 'input-error' : ''}
                                />
                                {receiverError && <p className="error-message">{receiverError}</p>}
                            </label>

                            <label>
                                Mensaje (opcional):
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </label>
                            <hr />
                            <div className="buttons">
                                <button type="submit" className="send-btn">Enviar mail</button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowConfirmModal(true)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </main>
            <Footer />

            {/* Alertas */}
            {showSuccessModal && (
                <SuccessAlert
                    message="¡Juego compartido con éxito!"
                    onClose={() => { setShowSuccessModal(false); navigate(-1); }}
                />
            )}

            {showConfirmModal && (
                <ConfirmAlert
                    message="¿Estás seguro de cancelar el envío?"
                    onConfirm={() => navigate(-1)}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );

};

export default SharePage;
