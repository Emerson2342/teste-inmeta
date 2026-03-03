import { WorkOrder } from "@src/props/types";

export const workOrdersMock: WorkOrder[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    title: "Serviço de Pedreiro - Fundamento",
    description: "Preparar a fundação do prédio residencial no lote 12.",
    status: "Pending",
    assignedTo: "João Silva",
    createdAt: new Date("2026-03-01T08:30:00Z").toISOString(),
    updatedAt: new Date("2026-03-01T08:30:00Z").toISOString(),
    completed: false,
    deleted: false,
  },
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb45",
    title: "Projeto Arquitetônico - Sala Comercial",
    description:
      "Desenvolver planta e layout da nova sala comercial do edifício.",
    status: "In Progress",
    assignedTo: "Maria Souza",
    createdAt: new Date("2026-03-01T09:00:00Z").toISOString(),
    updatedAt: new Date("2026-03-01T10:15:00Z").toISOString(),
    completed: false,
    deleted: false,
  },
  {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    title: "Limpeza Pós-Obra - Andar Térreo",
    description:
      "Limpeza completa do andar térreo após finalização da construção.",
    status: "Completed",
    assignedTo: "Carlos Oliveira",
    createdAt: new Date("2026-02-28T14:00:00Z").toISOString(),
    updatedAt: new Date("2026-03-01T12:00:00Z").toISOString(),
    completed: true,
    deleted: false,
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    title: "Instalação Elétrica - Andar 2",
    description:
      "Passar cabeamento, instalar tomadas e interruptores no segundo andar.",
    status: "Pending",
    assignedTo: "Ana Pereira",
    createdAt: new Date("2026-03-02T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-03-02T08:00:00Z").toISOString(),
    completed: false,
    deleted: false,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Pintura - Fachada",
    description:
      "Pintar a fachada do prédio comercial, incluindo detalhes em branco e azul.",
    status: "In Progress",
    assignedTo: "Pedro Lima",
    createdAt: new Date("2026-03-02T09:30:00Z").toISOString(),
    updatedAt: new Date("2026-03-02T10:00:00Z").toISOString(),
    completed: false,
    deleted: false,
  },
];
