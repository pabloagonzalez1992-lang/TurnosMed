import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface Especialidad {
  id?: number;
  nombre?: string;
}

export interface Profesional {
  id: number;
  nombre: string;
  especialidad: string;
  matricula: string;
}

export const especialidades: string[] = [];
export const profesionales: Profesional[] = [];

export async function loadData(): Promise<void> {
  const dataDir = path.join(process.cwd(), 'src', 'data');

  const especialidadesRaw = await readFile(path.join(dataDir, 'especialidades.json'), 'utf-8');
  const profesionalesRaw = await readFile(path.join(dataDir, 'profesionales.json'), 'utf-8');

  const parsedEspecialidades = JSON.parse(especialidadesRaw) as string[];
  const parsedProfesionales = JSON.parse(profesionalesRaw) as Profesional[];

  especialidades.splice(0, especialidades.length, ...parsedEspecialidades);
  profesionales.splice(0, profesionales.length, ...parsedProfesionales);
}
