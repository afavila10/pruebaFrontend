import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Props {
    show: boolean;
    onClose: () => void;
    tipos: string[];
    onActualizar: (tipos: string[]) => void;
}

const ModalTiposDocumento: React.FC<Props> = ({ show, onClose, tipos, onActualizar }) => {
    const [nuevosTipos, setNuevosTipos] = useState([...tipos]);
    const [nuevoTipo, setNuevoTipo] = useState('');

    const agregarTipo = () => {
        if (nuevoTipo && !nuevosTipos.includes(nuevoTipo)) {
            setNuevosTipos([...nuevosTipos, nuevoTipo]);
            setNuevoTipo('');
        }
    };

    const editarTipo = (index: number, nuevoValor: string) => {
        const actualizados = [...nuevosTipos];
        actualizados[index] = nuevoValor;
        setNuevosTipos(actualizados);
    };

    const eliminarTipo = (index: number) => {
        const actualizados = nuevosTipos.filter((_, i) => i !== index);
        setNuevosTipos(actualizados);
    };

    const guardarCambios = () => {
        onActualizar(nuevosTipos);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Gestionar Tipos de Documento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Nuevo tipo</Form.Label>
                    <div className="d-flex gap-2">
                        <Form.Control
                            value={nuevoTipo}
                            onChange={(e) => setNuevoTipo(e.target.value)}
                            placeholder="Ej: Resolucion"
                        />
                        <Button onClick={agregarTipo}>Agregar</Button>
                    </div>
                </Form.Group>

                {nuevosTipos.map((tipo, index) => (
                    <div key={index} className="d-flex align-items-center mb-2 gap-2">
                        <Form.Control
                            value={tipo}
                            onChange={(e) => editarTipo(index, e.target.value)}
                        />
                        <Button variant="danger" size="sm" onClick={() => eliminarTipo(index)}>Eliminar</Button>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="dark" onClick={guardarCambios}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTiposDocumento;
