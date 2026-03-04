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
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
  createdAt: string; // ISODate
  updatedAt: string; // ISODate
  deletedAt?: string; // ISODate
  completed: boolean;
  deleted: boolean;
}

export interface NewOrderType {
  title: string;
  description: string;
  assignedTo: string;
}
export interface UpdateOrderProps {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  assignedTo: string;
}
