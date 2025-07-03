// src/components/Navbar.tsx
import React, { useState } from 'react';
import DocumentForm from './DocumentForm';
import type { DocumentData } from './DocumentForm';
import type { FC } from 'react';
interface Props {
    onNuevoDocumento: (nuevoDoc: DocumentData) => void;
}


const Navbar: React.FC<Props> = ({ onNuevoDocumento }) => {
    const [mostrarModal, setMostrarModal] = useState(false);
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
                />
                <button className="btn btn-outline-dark text-nowrap">Tipos de documento</button>
            </div>
        </nav>
    );
};

export default Navbar;
