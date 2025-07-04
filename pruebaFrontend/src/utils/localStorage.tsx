import type { DocumentData } from "../models/Document";

const STORAGE_KEY = "documentos";

export const guardarDocumento = (doc: DocumentData) => {
    const docs = obtenerDocumentos();
    docs.push(doc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
};

export const obtenerDocumentos = (): DocumentData[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const eliminarDocumento = (id: string) => {
    const docs = obtenerDocumentos().filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
};

