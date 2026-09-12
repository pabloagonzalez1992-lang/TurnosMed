import { Medico } from '../models/medico.model';

let medicos: Medico[] = [
  { id: 1, nombre: 'Dr. Rodrigo Álvarez', especialidad: 'Cardiología', matricula: 'CO-1001', disponible: true },
  { id: 2, nombre: 'Dra. Gabriela Silva', especialidad: 'Dermatología', matricula: 'DER-2401', disponible: true },
  { id: 3, nombre: 'Dr. Nicolás Torres', especialidad: 'Endocrinología', matricula: 'END-6702', disponible: false },
  { id: 4, nombre: 'Dr. Tomás Suárez', especialidad: 'Pediatría', matricula: 'PED-1134', disponible: true },
  { id: 5, nombre: 'Dra. Camila Reyes', especialidad: 'Medicina General', matricula: 'GEN-1101', disponible: true }
];

export class MedicoService {
  getAll(filters?: { especialidad?: string; disponible?: boolean }) {
    return medicos.filter((m) => {
      const byEspecialidad = filters?.especialidad ? m.especialidad.toLowerCase() === filters.especialidad.toLowerCase() : true;
      const byDisponibilidad = typeof filters?.disponible === 'boolean' ? m.disponible === filters.disponible : true;
      return byEspecialidad && byDisponibilidad;
    });
  }

  getById(id: number) {
    return medicos.find((m) => m.id === id);
  }

  create(data: Omit<Medico, 'id'>) {
    const newId = medicos.length ? Math.max(...medicos.map(m => m.id)) + 1 : 1;
    const medico = { id: newId, ...data };
    medicos.push(medico);
    return medico;
  }

  update(id: number, data: Partial<Medico>) {
    const medico = this.getById(id);
    if (!medico) return undefined;
    Object.assign(medico, data);
    return medico;
  }

  delete(id: number) {
    const idx = medicos.findIndex(m => m.id === id);
    if (idx < 0) return false;
    medicos = medicos.filter(m => m.id !== id);
    return true;
  }
}
