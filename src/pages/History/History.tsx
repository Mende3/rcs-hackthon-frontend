import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDownload, FiPrinter, FiSearch } from "react-icons/fi";
import { getReqClients } from "../../endpoints/getReqClient";

interface Pedido {
  numero: string;
  requisicao: string;
  resposta: string;
  status: string;
  data: string;
  n_pedido: string;
  id: string;
  hora: string;
}

interface ClientRequest {
  email: string;
  empresa: string;
  pedidos: Pedido[];
}

interface HistoricoItem {
  email: string;
  empresa: string;
  data: string;
  hora: string;
  pedido: Pedido;
}

export const HistoricoPage: React.FC = () => {
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmpresa, setFilterEmpresa] = useState("");

  const loadHistorico = async (): Promise<void> => {
    try {
      const response = await getReqClients();
      const clientes: ClientRequest[] = response.data;

      // Transformar os dados para o formato do histórico
      const historicoData: HistoricoItem[] = [];
      
      clientes.forEach(cliente => {
        cliente.pedidos.forEach(pedido => {
          // Extrair data e hora do pedido (assumindo formato DD/MM/AAAA HH:MM)
          const [data, hora] = pedido.data.split(' ');
          
          historicoData.push({
            email: cliente.email,
            empresa: cliente.empresa,
            data: data || pedido.data,
            hora: hora || "00:00",
            pedido: pedido
          });
        });
      });

      // Ordenar por data e hora (mais recente primeiro)
      historicoData.sort((a, b) => {
        const dateA = new Date(a.data.split('/').reverse().join('-'));
        const dateB = new Date(b.data.split('/').reverse().join('-'));
        
        if (dateA.getTime() === dateB.getTime()) {
          return b.hora.localeCompare(a.hora);
        }
        
        return dateB.getTime() - dateA.getTime();
      });

      setHistorico(historicoData);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistorico();
  }, []);

  // Filtrar histórico baseado no termo de busca e filtro de empresa
  const filteredHistorico = historico.filter(item => {
    const matchesSearch = item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmpresa = filterEmpresa ? item.empresa === filterEmpresa : true;
    
    return matchesSearch && matchesEmpresa;
  });

  // Obter lista única de empresas para o filtro
  const empresas = Array.from(new Set(historico.map(item => item.empresa)));

  const handlePrint = (): void => {
    window.print();
  };

  const exportToCSV = (): void => {
    const headers = ["Email", "Empresa", "Data", "Hora", "Nº Pedido", "Status"];
    const csvData = filteredHistorico.map(item => [
      item.email,
      item.empresa,
      item.data,
      item.hora,
      item.pedido.n_pedido,
      item.pedido.status
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "historico_pedidos.csv");
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-stone-500 hover:text-stone-600 transition-colors mb-4 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para o dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-stone-800 mb-2">Histórico de Pedidos</h1>
              <p className="text-stone-600">
                Visualize todos os pedidos processados no sistema
              </p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button 
                onClick={exportToCSV}
                className="px-4 py-2 bg-white border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors flex items-center"
              >
                <FiDownload className="mr-2" />
                Exportar CSV
              </button>
              <button 
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <FiPrinter className="mr-2" />
                Imprimir
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-stone-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-stone-700 mb-1">
                Filtrar por empresa
              </label>
              <select
                id="empresa"
                value={filterEmpresa}
                onChange={(e) => setFilterEmpresa(e.target.value)}
                className="block w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas as empresas</option>
                {empresas.map(empresa => (
                  <option key={empresa} value={empresa}>{empresa}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Estatísticas
              </label>
              <div className="text-sm text-stone-600 bg-stone-50 p-2 rounded-lg">
                {filteredHistorico.length} {filteredHistorico.length === 1 ? 'registro' : 'registros'} encontrados
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de histórico */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200">
              <thead className="bg-stone-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Nº Pedido
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-200">
                {filteredHistorico.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-stone-500">
                      <FiSearch className="mx-auto h-12 w-12 text-stone-300 mb-2" />
                      <p>Nenhum registro encontrado</p>
                      <p className="text-sm">Tente ajustar os filtros de busca</p>
                    </td>
                  </tr>
                ) : (
                  filteredHistorico.map((item, index) => (
                    <tr key={index} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-stone-900">{item.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-stone-900">{item.empresa}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-stone-900">
                          <FiCalendar className="mr-1.5 h-4 w-4 text-stone-400" />
                          {item.data}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-stone-900">
                          <FiClock className="mr-1.5 h-4 w-4 text-stone-400" />
                          {item.hora}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-stone-900">#{item.pedido.n_pedido}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.pedido.status === 'concluído' 
                            ? 'bg-green-100 text-green-800' 
                            : item.pedido.status === 'pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.pedido.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginação (se necessário) */}
        {filteredHistorico.length > 10 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-stone-700">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
              <span className="font-medium">{filteredHistorico.length}</span> resultados
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50">
                Anterior
              </button>
              <button className="px-3 py-1.5 border border-stone-300 text-sm font-medium rounded-md text-stone-700 bg-white hover:bg-stone-50">
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estilos para impressão */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .min-h-screen, .min-h-screen * {
            visibility: visible;
          }
          .min-h-screen {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
          }
          .bg-stone-50 {
            background-color: white !important;
          }
          .shadow-sm, .shadow-md, .shadow-lg {
            box-shadow: none !important;
          }
          .rounded-xl, .rounded-lg {
            border-radius: 0 !important;
          }
          button, .flex, .hidden {
            display: none !important;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};