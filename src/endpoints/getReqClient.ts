import axios from "axios";
import type { AxiosResponse } from "axios";
import api from "../services/configAxios";


const API_BASE_URL = 'http://127.0.0.1:8000';


// Interfaces para os tipos de dados
export interface Pedido {
  id: string;
  numero: string;
  requisicao: string;
  resposta: string;
  status: string;
  data: string;
  n_pedido: string;
}

export interface ClientRequest {
  email: string;
  empresa: string;
  pedidos: Pedido[];
}

// Tipos para as respostas da API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Função para buscar clientes
export const getReqClients = async (): Promise<AxiosResponse<ClientRequest[]>> => {
  return api.get<ClientRequest[]>(`/app_req_logs/listar_pedidos_de_quote`);
};

export const deletePedido = async (pedidoId: number): Promise<AxiosResponse<void>> => {
  return api.delete<void>(`/app_req_logs/delete_pedidos_de_quote/${pedidoId}`);
};
