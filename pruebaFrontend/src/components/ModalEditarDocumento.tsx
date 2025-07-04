import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

type Documento = {
    id: number;
    nombre: string;
    tipo: string;
    fecha: string;
    descripcion: string;
    archivo: string;
};

type Props = {
    show: boolean;
    documento: Documento | null;
    onClose: () => void;
    onGuardar: (docEditado: Documento) => void;
};

const ModalEditarDocumento: React.FC<Props> = ({ show, documento, onClose, onGuardar }) => {
    const [formData, setFormData] = useState<Documento | null>(null);

    // Cargar datos al abrir el modal
    useEffect(() => {
        if (documento) {
            setFormData({ ...documento });
        }
    }, [documento]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => prev ? { ...prev, [name]: value } : prev);
    };

    const handleSubmit = () => {
        if (formData) {
            onGuardar(formData);
            onClose();
        }
    };

    if (!formData) return null;

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>?? Editar Documento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre del documento"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Documento</Form.Label>
                        <Form.Select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Factura">Factura</option>
                            <option value="Contrato">Contrato</option>
                            <option value="Certificado">Certificado</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Descripción del documento"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarDocumento;
