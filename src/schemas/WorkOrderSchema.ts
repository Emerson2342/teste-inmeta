import { Realm } from "@realm/react";

export class WorkOrderSchema extends Realm.Object {
  localId!: string;
  serverId?: string;
  title!: string;
  description!: string;
  status!: "Pending" | "In Progress" | "Completed";
  assignedTo!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt?: string;
  completed!: boolean;
  deleted!: boolean;
  pendingSync!: boolean;
  localDeleted!: boolean;

  static schema: Realm.ObjectSchema = {
    name: "WorkOrder",
    primaryKey: "localId",
    properties: {
      localId: "string",
      serverId: "string?",
      title: "string",
      description: "string",
      status: "string",
      assignedTo: "string",
      createdAt: "string",
      updatedAt: "string",
      deletedAt: "string?",
      completed: "bool",
      deleted: "bool",
      pendingSync: "bool",
      localDeleted: "bool",
    },
  };
}
