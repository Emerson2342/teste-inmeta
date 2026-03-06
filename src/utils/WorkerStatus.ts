import { WorkOrderStatus } from "./Enums";

export const getStatusLabel = (status: WorkOrderStatus) => {
  switch (status) {
    case WorkOrderStatus.PENDING:
      return "Pendente";
    case WorkOrderStatus.COMPLETED:
      return "Finalizado";
    case WorkOrderStatus.INPROGRESS:
      return "Em andamento";
    default:
      return status;
  }
};
