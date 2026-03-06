import {
  ApiResponse,
  UpdateOrderApi,
  WorkOrder,
  WorkOrderResponse,
} from "@src/props/types";
import { BASE_URL } from "@src/utils/const";

export const getWorkOrders = async () => {
  const response = await fetch(`${BASE_URL}/work-orders`);
  return response.json();
};

export const getWorkOrder = async (id: string) => {
  const response = await fetch(`${BASE_URL}/work-orders/${id}`);
  return response.json();
};

export const createWorkOrder = async (
  data: WorkOrder,
): Promise<ApiResponse<WorkOrderResponse>> => {
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
  const responseData = response.ok
    ? await response.json()
    : "Erro ao criar a ordem";

  return {
    data: responseData,
    message: response.ok ? "Ordem criada com sucesso" : "Erro ao criar a ordem",
    status: response.status,
    success: response.ok,
  };
};

export const updateWorkOrderAPI = async (
  data: UpdateOrderApi,
  id?: string,
): Promise<ApiResponse<WorkOrderResponse>> => {
  if (!id) {
    return {
      data: undefined,
      message: "ID da ordem é obrigatório",
      status: 400,
      success: false,
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/work-orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = response.ok ? await response.json() : undefined;
    return {
      data: responseData,
      message: response.ok
        ? "Ordem atualizada com sucesso"
        : "Erro ao atualizar a ordem",
      status: response.status,
      success: response.ok,
    };
  } catch (error) {
    return {
      data: undefined,
      message: "Erro de conexão com a API",
      status: 0,
      success: false,
    };
  }
};

export const deleteWorkOrder = async (
  id?: string,
): Promise<ApiResponse<string>> => {
  if (!id)
    return {
      data: "Id inválido",
      message: "ID da ordem é obrigatório",
      status: 40,
      success: false,
    };
  const response = await fetch(`${BASE_URL}/work-orders/${id}`, {
    method: "DELETE",
  });

  return {
    data: "Ordem apagada com sucesso!",
    message: response.ok
      ? "Ordem apagada com sucesso!"
      : "Erro ao apagar a ordem!",
    status: response.status,
    success: response.ok,
  };
};
