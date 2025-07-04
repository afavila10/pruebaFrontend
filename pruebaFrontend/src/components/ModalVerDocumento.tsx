// components/ModalVerDocumento.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Documento = {
    id: number;
    nombre: string;
    tipo: '';
    fecha: string;
    descripcion: string;
    archivo: string;
};

type Props = {
    show: boolean;
    documento: Documento | null;
    onClose: () => void;
};

const descargarArchivo = (documento: Documento) => {
    if (!documento?.archivo) return;

    const link = document.createElement('a');
    link.href = documento.archivo;
    link.download = documento.nombre || 'documento';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};



const ModalVerDocumento: React.FC<Props> = ({ show, documento, onClose }) => {
    if (!show || !documento) return null;

    // Detectar si es PDF o imagen para mostrar correctamente
    const esPDF = documento.archivo?.includes('application/pdf');

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>📄 CV Desarrollador </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex gap-4 flex-wrap">
                    {/* Vista previa */}
                    <div style={{ flex: '1 1 400px' }}>
                        <h5 className="mb-2">📑 Vista previa:</h5>
                        {esPDF ? (
                            <iframe
                                src={documento.archivo}
                                title="Vista previa PDF"
                                style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
                            />
                        ) : (
                            <img
                                src={documento.archivo}
                                alt="Vista previa"
                                style={{ width: '100%', maxHeight: '300px', border: '1px solid #ccc', objectFit: 'contain' }}
                            />
                        )}
                    </div>

                    {/* Detalles */}
                    <div style={{ flex: '1 1 300px' }}>
                        <h5 className="mb-3">📝 Características</h5>
                        <p><strong>Nombre:</strong><br />{documento.nombre}</p>
                        <p><strong>Tipo:</strong><br />{documento.tipo}</p>
                        <p><strong>Fecha de Creación:</strong><br />{documento.fecha}</p>
                        <p><strong>Descripción:</strong><br />{documento.descripcion}</p>
                        <Button className="Button1" variant="dark" onClick={() => descargarArchivo(documento!)}>
                            Descargar Archivo
                        </Button>
                    </div>
                    
                </div>
                

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>

    );
};

export default ModalVerDocumento;
