export interface Posicion {
  id: number;
  nombre: string;
}

export interface Futbolista {
  id: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string; 
  caracteristicas: string;
  posicion: Posicion;
}