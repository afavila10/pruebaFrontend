// src/components/Navbar.tsx
import React, { useState } from 'react';
import type { DocumentData } from './DocumentForm';
import DocumentForm from './DocumentForm';
import ModalTiposDocumento from './ModalTiposDocumento';



interface Props {
    onNuevoDocumento: (nuevoDoc: DocumentData) => void;
    tiposDocumento: string[];
    onActualizarTipos: (nuevosTipos: string[]) => void;
    onGestionarTipos: () => void;
}



const Navbar: React.FC<Props> = ({ onNuevoDocumento, onActualizarTipos, tiposDocumento, onGestionarTipos }) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarTipos, setMostrarTipos] = useState(false);


    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">DocuGestion</span>
            </div>
            <div className="d-flex gap-2 p-4">
                <button className="btn btn-outline-dark" onClick={() => setMostrarModal(true)}>
                    Documentos
                </button>
                <DocumentForm
                    mostrarModal={mostrarModal}
                    cerrarModal={() => setMostrarModal(false)}
                    onNuevo={onNuevoDocumento}
                    tiposDocumento={tiposDocumento} 
                />
                <button
                    className="btn btn-outline-dark text-nowrap"
                    onClick={onGestionarTipos} // 
                >
                    Tipos de documento
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
