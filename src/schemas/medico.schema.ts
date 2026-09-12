import { z } from 'zod';

export const MedicoSchema = z.object({
  nombre: z.string().min(2).max(80),
  especialidad: z.string().min(2).regex(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[a-záéíóúñ]+)*$/u, 'La especialidad debe usar formato PascalCase/Title Case válido'),
  matricula: z.string().min(3).max(20),
  disponible: z.boolean().default(true)
});

export const MedicoUpdateSchema = MedicoSchema.partial();
