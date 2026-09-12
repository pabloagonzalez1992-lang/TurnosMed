export interface Turno {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  especialidad: string;
  medicoId: number;
  estado: 'confirmado' | 'pendiente' | 'cancelado' | 'reprogramado';
}
