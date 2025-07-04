import React from 'react';
import type { DocumentData } from '../components/DocumentForm';

type Props = {
    documentos: DocumentData[];
    onVer?: (id: string) => void;
    onEditar?: (doc: DocumentData) => void;
    onEliminar?: (id: string) => void;
    onRestablecer?: (id: string) => void;
};

const TablaDocumentos: React.FC<Props> = ({
    documentos,
    onVer,
    onEditar,
    onEliminar,
    onRestablecer
}) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered align-middle">
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
                            <td colSpan={5} className="text-center text-muted">No hay documentos registrados</td>
                        </tr>
                    ) : (
                        documentos.map((doc) => {
                            const desactivado = doc.activo === false;

                            return (
                                <tr key={doc.id} className={desactivado ? 'table-warning' : ''}>
                                    <td>{doc.nombre}</td>
                                    <td>{doc.tipo}</td>
                                    <td>{doc.fecha}</td>
                                    <td>{doc.descripcion}</td>
                                    <td className="text-center">
                                        {!desactivado && (
                                            <>
                                                <button className="btn btn-sm me-1" onClick={() => onVer?.(doc.id)}>
                                                    <i className="bi bi-eye-fill text-primary"></i>
                                                </button>
                                                <button className="btn btn-sm me-1" onClick={() => onEditar?.(doc)}>
                                                    <i className="bi bi-pencil-square text-warning"></i>
                                                </button>
                                                <button className="btn btn-sm" onClick={() => onEliminar?.(doc.id)}>
                                                    <i className="bi bi-trash-fill text-danger"></i>
                                                </button>
                                            </>
                                        )}
                                        {desactivado && (
                                            <button className="btn btn-sm btn-success" onClick={() => onRestablecer?.(doc.id)}>
                                                <i className="bi bi-arrow-clockwise"></i> Restablecer
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TablaDocumentos;
