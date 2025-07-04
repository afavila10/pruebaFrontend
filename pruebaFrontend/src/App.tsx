import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import FiltroDocumentos  from './components/FiltroDocumentos';
import TablaDocumentos from './components/TablaDocumentos';
import type { DocumentData } from './components/DocumentForm';
import ModalVerDocumento from './components/ModalVerDocumento';
import ModalEditarDocumento from './components/ModalEditarDocumento';


const App: React.FC = () => {

    // Nuevo estado para el modal
    const [showModal, setShowModal] = useState(false);
    const [documentoSeleccionado, setDocumentoSeleccionado] = useState<DocumentData | null>(null);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [documentoEditando, setDocumentoEditando] = useState<DocumentData | null>(null);



    const [documentos, setDocumentos] = useState<DocumentData[]>([]);
    const [filtros, setFiltros] = useState({
        texto: '',
        tipo: '',
        fecha: '',
    });




    // Función que se llama al hacer clic en "Ver"
    const verDocumento = (id: string) => {
        const doc = documentos.find((d) => d.id === id);
        if (doc) {
            setDocumentoSeleccionado(doc);
            setShowModal(true);
        }
    };


    const guardarEdicion = (docEditado: DocumentData) => {
        const actualizados = documentos.map((d) => d.id === docEditado.id ? docEditado : d);
        setDocumentos(actualizados);
        localStorage.setItem('documentos', JSON.stringify(actualizados));
    };

    // 🔁 Cargar documentos desde localStorage al montar
    useEffect(() => {
        const storedDocs = localStorage.getItem('documentos');
        if (storedDocs) {
            const parsedDocs = JSON.parse(storedDocs).map((doc: any) => ({
                ...doc,
                tipo: doc.tipo ?? '',
                fecha: doc.fecha ?? '',
            }));
            setDocumentos(parsedDocs);
        }
    }, []);

    const handleEditar = (doc: DocumentData) => {
        setDocumentoEditando(doc);
        setShowModalEditar(true);
    };

    // Lógica de filtrado
    const documentosFiltrados = documentos.filter((doc) => {
        const coincideTexto =
            doc.nombre.toLowerCase().includes(filtros.texto.toLowerCase())
            /*doc.descripcion.toLowerCase().includes(filtros.texto.toLowerCase());*/

        const coincideTipo = filtros.tipo === '' || doc.tipo === filtros.tipo;

        const coincideFecha = filtros.fecha === '' || doc.fecha === filtros.fecha;

        return coincideTexto && coincideTipo && coincideFecha;
    });



    const handleNuevoDocumento = (nuevoDoc: DocumentData) => {
        setDocumentos((prev) => [...prev, nuevoDoc]);
    };


    return (
        <div>
            <Navbar onNuevoDocumento={handleNuevoDocumento} />
            <div className="d-flex">
                <div className="p-4 flex-grow-1">
                    <FiltroDocumentos filtros={filtros} onFiltrosChange={setFiltros} />
                    {/*<h2 className="mb-3">📂 Bienvenido al Gestor de Documentos</h2>*/}
                    <TablaDocumentos
                        documentos={documentosFiltrados}
                        onVer={verDocumento}
                        onEditar={handleEditar}
                    />
                    <ModalVerDocumento
                        show={showModal}
                        documento={documentoSeleccionado}
                        onClose={() => setShowModal(false)}
                    />
                    <ModalEditarDocumento
                        show={showModalEditar}
                        documento={documentoEditando}
                        onClose={() => setShowModalEditar(false)}
                        onGuardar={guardarEdicion}
                    />

                </div>
            </div>
        </div>
    );
};

export default App;
