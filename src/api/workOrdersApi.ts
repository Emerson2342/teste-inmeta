import {
  ApiResponse,
  ApiResponseError,
  SynIncrementalResponse,
  UpdateOrderApi,
  WorkOrder,
  WorkOrderResponse,
} from "@src/props/types";
import { BASE_URL } from "@src/utils/const";

const serverError: ApiResponseError = {
  success: false,
  message: "Erro de conexão com o servidor!",
  status: 500,
};

export const getWorkOrders = async (): Promise<ApiResponse<WorkOrder[]>> => {
  try {
    const response = await fetch(`${BASE_URL}/work-orders`);
    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: json?.error || "Erro ao buscar as ordens de serviço",
        status: response.status,
      };
    }
    return {
      success: response.ok,
      data: json,
      status: response.status,
    };
  } catch (e) {
    return serverError;
  }
};

export const createWorkOrder = async (
  data: WorkOrder,
): Promise<ApiResponse<WorkOrderResponse>> => {
  try {
    const response = await fetch(`${BASE_URL}/work-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: json?.error || "Erro ao criar WorkOrder",
        status: response.status,
      };
    }
    return {
      data: json,
      status: response.status,
      success: response.ok,
    };
  } catch (e) {
    return serverError;
  }
};

export const updateWorkOrderAPI = async (
  data: UpdateOrderApi,
  id?: string,
): Promise<ApiResponse<WorkOrderResponse>> => {
  if (!id) {
    return {
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

    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: json?.error || "Erro ao criar WorkOrder",
        status: response.status,
      };
    }
    return {
      data: json,
      status: response.status,
      success: response.ok,
    };
  } catch (error) {
    return serverError;
  }
};

export const deleteWorkOrder = async (
  id?: string,
): Promise<ApiResponse<string>> => {
  if (!id)
    return {
      message: "ID da ordem é obrigatório",
      status: 40,
      success: false,
    };
  try {
    const response = await fetch(`${BASE_URL}/work-orders/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: json?.error || "Erro ao criar WorkOrder",
        status: response.status,
      };
    }
    return {
      data: "Ordem apagada com sucesso!",
      status: response.status,
      success: response.ok,
    };
  } catch (e) {
    return serverError;
  }
};

export const fetchWorkOrdersSync = async (
  since: string,
): Promise<ApiResponse<SynIncrementalResponse>> => {
  try {
    const response = await fetch(`${BASE_URL}/work-orders/sync?since=${since}`);
    const json = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: json?.error || "Erro ao buscar dados da API",
        status: response.status,
      };
    }
    return {
      success: true,
      status: response.status,
      data: json,
    };
  } catch (e) {
    return serverError;
  }
};
