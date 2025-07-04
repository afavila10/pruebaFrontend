export interface DocumentData {
    id: string; // UUID
    nombre: string;
    tipo: string;
    fecha: string;
    descripcion: string;
    archivo: string; // base64 o URL temporal
}
