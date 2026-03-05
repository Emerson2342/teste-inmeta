export interface ThemeColor {
  Theme1: {
    dark: string;
    semidark: string;
    standard: string;
    semilight: string;
    light: string;
  };
  Theme2: {
    dark: string;
    semidark: string;
    standard: string;
    semilight: string;
    light: string;
  };
}

export interface WorkOrder {
  localId: string;
  serverId?: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  completed: boolean;
  deleted: boolean;
  pendingSync: boolean;
  localDeleted: boolean;
}

export interface WorkOrderResponse {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  deleted: boolean;
}

export interface NewOrderType {
  title: string;
  description: string;
  assignedTo: string;
}
export interface UpdateOrderProps {
  localId: string;
  serverId?: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
  pendingSync?: boolean;
}

export interface UpdateOrderApi {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  status: number;
}

export interface SynIncrementalResponse {
  created: WorkOrderResponse[];
  updated: WorkOrderResponse[];
  deleted: WorkOrderResponse[];
}
