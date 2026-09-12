import { z } from 'zod';

export const TurnoSchema = z.object({
  paciente: z.string().min(2).max(80),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hora: z.string().regex(/^\d{2}:\d{2}$/),
  especialidad: z.string().min(2).regex(/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[a-záéíóúñ]+)*$/u, 'La especialidad debe usar formato PascalCase/Title Case válido'),
  medicoId: z.number().int().positive(),
  estado: z.enum(['confirmado', 'pendiente', 'cancelado', 'reprogramado']).default('pendiente')
});

export const TurnoUpdateSchema = TurnoSchema.partial();
