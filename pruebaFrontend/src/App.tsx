import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import FiltroDocumentos from './components/FiltroDocumentos';
import TablaDocumentos from './components/TablaDocumentos';
import DocumentData from './components/DocumentForm';



const App: React.FC = () => {

    const [documentos, setDocumentos] = useState<DocumentData[]>([]);


    // 🔁 Cargar documentos desde localStorage al montar
    useEffect(() => {
        const storedDocs = localStorage.getItem('documentos');
        if (storedDocs) {
            setDocumentos(JSON.parse(storedDocs));
        }
    }, []);

    const handleNuevoDocumento = (nuevoDoc: DocumentData) => {
        setDocumentos((prev) => [...prev, nuevoDoc]);
    };

    const verDocumento = (id: string) => {
        const doc = documentos.find((d) => d.id === id);
        if (doc?.archivo) {
            window.open(doc.archivo, '_blank');
        } else {
            alert(`Ver documento: ${doc?.nombre}`);
        }
    };




    return (
        <div>
            <Navbar onNuevoDocumento={handleNuevoDocumento} />
            <div className="d-flex">
                <div className="p-4 flex-grow-1">
                    <FiltroDocumentos />
                    {/*<h2 className="mb-3">📂 Bienvenido al Gestor de Documentos</h2>*/}
                    <TablaDocumentos
                        documentos={documentos}
                        onVer={verDocumento}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
