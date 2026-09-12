import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Turno } from '../models/turno.model';

let turnos: Turno[] = [
  { id: 1, paciente: 'Lucía Gómez', fecha: '2026-09-11', hora: '08:00', especialidad: 'Cardiología', medicoId: 1, estado: 'confirmado' },
  { id: 2, paciente: 'Mateo Rodríguez', fecha: '2026-09-12', hora: '09:30', especialidad: 'Pediatría', medicoId: 14, estado: 'pendiente' }
];

export class TurnoService {
  getAll(filters?: { especialidad?: string; fecha?: string; medicoId?: number }) {
    return turnos.filter((t) => {
      const byEspecialidad = filters?.especialidad ? t.especialidad.toLowerCase() === filters.especialidad.toLowerCase() : true;
      const byFecha = filters?.fecha ? t.fecha === filters.fecha : true;
      const byMedico = filters?.medicoId ? t.medicoId === filters.medicoId : true;
      return byEspecialidad && byFecha && byMedico;
    });
  }

  getById(id: number) {
    return turnos.find((t) => t.id === id);
  }

  create(data: Omit<Turno, 'id'>) {
    const newId = turnos.length ? Math.max(...turnos.map(t => t.id)) + 1 : 1;
    const turno = { id: newId, ...data };
    turnos.push(turno);
    return turno;
  }

  update(id: number, data: Partial<Turno>) {
    const turno = this.getById(id);
    if (!turno) return undefined;
    Object.assign(turno, data);
    return turno;
  }

  delete(id: number) {
    const idx = turnos.findIndex(t => t.id === id);
    if (idx < 0) return false;
    turnos = turnos.filter(t => t.id !== id);
    return true;
  }
}
