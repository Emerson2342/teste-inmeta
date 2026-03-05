import { UpdateOrderApi, WorkOrder } from "@src/props/types";

const BASE_URL = "https://fieldsync.onrender.com";

export const getWorkOrders = async () => {
  const response = await fetch(`${BASE_URL}/work-orders`);
  return response.json();
};

export const getWorkOrder = async (id: string) => {
  const response = await fetch(`${BASE_URL}/work-orders/${id}`);
  return response.json();
};

export const createWorkOrder = async (data: WorkOrder) => {
  const response = await fetch(`${BASE_URL}/work-orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar WorkOrder");
  }
  return response.json();
};

export const updateWorkOrderAPI = async (data: UpdateOrderApi, id?: string) => {
  if (!id) throw new Error("Id da ordem inválido");
  const response = await fetch(`${BASE_URL}/work-orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteWorkOrder = async (id?: string) => {
  if (!id) throw new Error("Id da ordem inválido");
  const response = await fetch(`${BASE_URL}/work-orders/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return { success: true, message: "Order deletadi com sucesso" };
  }

  const text = await response.text();
  return text ? JSON.parse(text) : { success: true };
};
