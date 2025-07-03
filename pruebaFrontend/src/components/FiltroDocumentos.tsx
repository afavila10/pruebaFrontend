import React from 'react';

const FiltroDocumentos: React.FC = () => {
    return (
        <section className="p-4 border rounded bg-white shadow-sm mb-4">
            <h4 className="mb-4">📁 Documentos Cargados</h4>

            <form className="row g-3 align-items-end">
                {/* Búsqueda por texto */}
                <div className="col-md-4">
                    <label htmlFor="busqueda" className="form-label">Buscar por nombre o descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="busqueda"
                        placeholder="Ej: factura, contrato..."
                        onChange={(e) => console.log("Texto buscado:", e.target.value)}
                    />
                </div>

                {/* Select de tipo de documento */}
                <div className="col-md-4">
                    <label htmlFor="tipoDocumento" className="form-label">Tipo de documento</label>
                    <select
                        id="tipoDocumento"
                        className="form-select"
                        onChange={(e) => console.log("Tipo seleccionado:", e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="factura">Factura</option>
                        <option value="contrato">Contrato</option>
                        <option value="certificado">Certificado</option>
                    </select>
                </div>

                {/* Filtro por fecha */}
                <div className="col-md-4">
                    <label htmlFor="fechaFiltro" className="form-label">Filtrar por fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fechaFiltro"
                        onChange={(e) => console.log("Fecha seleccionada:", e.target.value)}
                    />
                </div>
            </form>
        </section>
    );
};

export default FiltroDocumentos;
