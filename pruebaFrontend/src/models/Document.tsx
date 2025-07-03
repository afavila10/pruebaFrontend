export interface DocumentData {
    id: string; // UUID
    nombre: string;
    tipoDocumento: string;
    fechaCreacion: string;
    descripcion: string;
    archivo: string; // base64 o URL temporal
}
