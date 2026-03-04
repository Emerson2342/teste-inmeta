import Realm from "realm";
import { WorkOrderSchema } from "../schemas/WorkOrderSchema";

export const realm = new Realm({
  schema: [WorkOrderSchema],
});
