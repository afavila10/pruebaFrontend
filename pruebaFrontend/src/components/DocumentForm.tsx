// src/components/DocumentForm.tsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Tipo de documento
export interface DocumentData {

    id: string;
    nombre: string;
    tipo: string;
    fecha: string;
    descripcion?: string;
    archivo: string;

}


// Guardar en localStorage
const guardarDocumento = (doc: DocumentData) => {
    const docs = JSON.parse(localStorage.getItem("documentos") || "[]");
    docs.push(doc);
    localStorage.setItem("documentos", JSON.stringify(docs));
};

interface Props {
    mostrarModal: boolean;
    cerrarModal: () => void;
    onNuevo: (doc: DocumentData) => void;
    tiposDocumento: string[];
}

const DocumentForm: React.FC<Props> = ({ mostrarModal, cerrarModal, onNuevo, tiposDocumento }) => {
    const [form, setForm] = useState<Omit<DocumentData, "id" | "archivo">>({
        nombre: "",
        tipo: "",
        fecha: "",
        descripcion: "",
    });
    const [archivo, setArchivo] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validTypes = ["application/pdf", "image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            alert("Solo se permiten archivos PDF, JPG o PNG");
            e.target.value = ""; // Limpia el input
            return;
        }

        setArchivo(file);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!archivo) return alert("Debes adjuntar un archivo");

        const reader = new FileReader();
        reader.onloadend = () => {
            const nuevoDoc: DocumentData = {
                id: uuidv4(),
                ...form,
                fecha: new Date().toISOString().slice(0, 10),
                archivo: reader.result as string,
            };
            guardarDocumento(nuevoDoc);
            onNuevo(nuevoDoc); // actualiza tabla u otra vista
            cerrarModal(); // cierra modal
        };
        reader.readAsDataURL(archivo);
    };

    return (
        <>
            {mostrarModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Cargar Nuevo Documento</h5>
                                    <button type="button" className="btn-close" onClick={cerrarModal}></button>
                                </div>
                                <div className="modal-body">
                                    <h6>Nombre del Documento</h6>
                                    <input className="form-control mb-2" name="nombre" placeholder="Nombre" onChange={handleChange} required />
                                    <h6>Tipo del documento</h6>
                                    <select
                                        className="form-control mb-2"
                                        name="tipo"
                                        onChange={handleChange}
                                        value={form.tipo}
                                        required
                                    >
                                        <option value="">Seleccione..</option>
                                        {tiposDocumento.map((tipo) => (
                                            <option key={tipo} value={tipo}>{tipo}</option>
                                        ))}
                                    </select>

                                    {/*<h6>Fecha</h6>
                                    <input className="form-control mb-2" type="date" name="fechaCreacion" onChange={handleChange} required />{*/ }
                                    <h6>Descripcion</h6>
                                    <textarea className="form-control mb-2" name="descripcion" placeholder="Descripcion" onChange={handleChange} />
                                    <h6>Archivo</h6>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".pdf, .jpg, .jpeg, .png"
                                        onChange={handleFile}
                                        required
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {mostrarModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

export default DocumentForm;
