import React from 'react';

type Documento = {
    id: number;
    nombre: string;
    tipo: string;
    fecha: string;
    descripcion: string;
};

type Props = {
    documentos: Documento[];
    onVer?: (id: number) => void;
    onEditar?: (doc: Documento) => void;
};

const TablaDocumentos: React.FC<Props> = ({ documentos, onVer, onEditar }) => {
    
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
                <thead className="table-light">
                    <tr>
                        <th>NOMBRE</th>
                        <th>TIPO</th>
                        <th>FECHA DE CREACION</th>
                        <th>DESCRIPCION</th>
                        <th className="text-center">ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {documentos.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center text-muted">No hay documentos registrados</td>
                        </tr>
                    ) : (
                        documentos.map((doc) => (
                            <tr key={doc.id}>
                                <td>{doc.nombre}</td>
                                <td>{doc.tipo}</td>
                                <td>{doc.fecha}</td>
                                <td>{doc.descripcion}</td>
                                <td className="text-center">
                                    <button onClick={() => onVer && onVer(doc.id)}>
                                        <i className="bi bi-eye-fill text-primary"></i>
                                    </button>
                                    <button onClick={() => onEditar?.(doc)}>
                                        <i className="bi bi-pencil-square text-warning"></i>
                                    </button>

                                    <button><i className="bi bi-trash-fill text-danger"></i></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaDocumentos;
