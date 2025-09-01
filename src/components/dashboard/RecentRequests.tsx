import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal, FiArrowUpRight, FiTrendingUp } from "react-icons/fi";
import { getReqClients } from "../../endpoints/getReqClient";

interface Pedido {
  empresa: string;
  numero: string;
  requisicao: string;
  resposta: string;
  status: string;
}

interface ClientRequest {
  email: string;
  pedidos: Pedido[];
}

export const RecentRequests = () => {
  const [requis, setReqs] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadReqClients = async () => {
    try {
      const response = await getReqClients();
      console.log("API response:", response.data);
      setReqs(response.data);
    } catch (err) {
      console.error("Erro ao carregar requisições:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReqClients();
  }, []);

  if (isLoading) {
    return (
      <div className="col-span-12 p-6 rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800">
            <FiTrendingUp className="text-violet-500" />
            Requisições Recentes
          </h3>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-stone-100 animate-pulse">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-stone-300 rounded w-3/4"></div>
                <div className="h-3 bg-stone-300 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-8 bg-stone-300 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 p-6 rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800">
          <FiTrendingUp className="text-violet-500" />
          Requisições Recentes
        </h3>
        <span className="text-sm text-stone-500">
          {requis.length} {requis.length === 1 ? 'cliente' : 'clientes'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHead />
          <tbody className="divide-y divide-stone-100">
  
            {requis
            .filter(req => req.pedidos.length > 0) 
            .map((req, index) => (
              <TableRow
                key={req.email}
                email={req.email}
                empresa={req.pedidos[0]?.empresa || "-"}
                requisicoes={req.pedidos.length}
                order={index}
              />
            ))}
          </tbody>
        </table>
        
        {requis.length === 0 && (
          <div className="text-center py-10">
            <div className="text-stone-400 mb-2">Nenhuma requisição encontrada</div>
            <p className="text-sm text-stone-500">As requisições aparecerão aqui quando disponíveis</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TableHead = () => (
  <thead>
    <tr className="text-left text-sm font-medium text-stone-500">
      <th className="pb-3 px-3">Email</th>
      <th className="pb-3 px-3">Empresa</th>
      <th className="pb-3 px-3">Requisições</th>
      <th className="pb-3 px-3 w-12"></th>
    </tr>
  </thead>
);

const TableRow = ({
  email,
  empresa,
  requisicoes,
  order,
}: {
  email: string;
  empresa: string;
  requisicoes: number;
  order: number;
}) => (
  <tr className="group hover:bg-stone-50 transition-colors duration-150">
    <td className="px-3 py-4">
      <div className="text-sm font-medium text-stone-800">{email}</div>
    </td>
    <td className="px-3 py-4">
      <div className="text-sm text-stone-600">{empresa}</div>
    </td>
    <td className="px-3 py-4">
      <div className="flex items-center">
        <span className="text-sm font-medium text-stone-800">{requisicoes}</span>
        {requisicoes > 0 && (
          <span className="ml-2 text-xs px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded-full">
            {requisicoes} {requisicoes === 1 ? 'pedido' : 'pedidos'}
          </span>
        )}
      </div>
    </td>
    <td className="px-3 py-4">
      <Link 
        to={`/detalhes/${email}`} 
        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-stone-400 hover:text-violet-500 hover:bg-violet-50 transition-colors duration-150 group-hover:bg-stone-100"
        title="Ver detalhes"
      >
        <FiArrowUpRight size={16} />
      </Link>
    </td>
  </tr>
);