import React, { useEffect, useState } from "react";
import { obtenerDocumentos, eliminarDocumento } from "../utils/localStorage";
import type { DocumentData } from "../models/Document";

const DocumentList: React.FC = () => {
    const [docs, setDocs] = useState<DocumentData[]>([]);

    const cargarDocs = () => setDocs(obtenerDocumentos());

    useEffect(() => {
        cargarDocs();
    }, []);

    const handleEliminar = (id: string) => {
        eliminarDocumento(id);
        cargarDocs();
    };

    return (
        <div>
            <h2>Documentos Guardados</h2>
            {docs.map(doc => (
                <div key={doc.id}>
                    <h3>{doc.nombre}</h3>
                    <p>{doc.tipoDocumento} - {doc.fechaCreacion}</p>
                    <p>{doc.descripcion}</p>
                    <a href={doc.archivo} target="_blank" rel="noopener noreferrer">Ver archivo</a>
                    <button onClick={() => handleEliminar(doc.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

export default DocumentList;
