import React from 'react';

interface FiltroDocumentosProps {
    filtros: {
        texto: string;
        tipo: string;
        fecha: string;
    };
    onFiltrosChange: (filtros: {
        texto: string;
        tipo: string;
        fecha: string;
    }) => void;
}

const FiltroDocumentos: React.FC<FiltroDocumentosProps> = ({ filtros, onFiltrosChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        onFiltrosChange({ ...filtros, [id]: value });
    };

    return (
        <section className="p-4 border rounded bg-white shadow-sm mb-4">
            <h4 className="mb-4">📁 Documentos Cargados</h4>

            <form className="row g-3 align-items-end">
                {/* Búsqueda por texto */}
                <div className="col-md-4">
                    <label htmlFor="texto" className="form-label">Buscar por nombre o descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="texto"
                        placeholder="Ej: factura, contrato..."
                        value={filtros.texto}
                        onChange={handleChange}
                    />
                </div>

                {/* Select de tipo de documento */}
                <div className="col-md-4">
                    <label htmlFor="tipo" className="form-label">Tipo de documento</label>
                    <select
                        id="tipo"
                        className="form-select"
                        value={filtros.tipo}
                        onChange={handleChange}
                    >
                        <option value="">Todos</option>
                        <option value="Factura">Factura</option>
                        <option value="Contrato">Contrato</option>
                        <option value="Certificado">Certificado</option>
                    </select>
                </div>

                {/* Filtro por fecha */}
                <div className="col-md-4">
                    <label htmlFor="fecha" className="form-label">Filtrar por fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        value={filtros.fecha}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </section>
    );
};

export default FiltroDocumentos;
