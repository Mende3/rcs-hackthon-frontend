import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReqClients, deletePedido } from "../../endpoints/getReqClient";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Pedido {
  numero: string;
  requisicao: string;
  resposta: string;
  status: string;
  data: string;
  n_pedido: string;
  id: number;
}

interface ClientRequest {
  email: string;
  empresa: string;
  pedidos: Pedido[];
}

export const DetalhesCliente: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const [cliente, setCliente] = useState<ClientRequest | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const loadClient = async (): Promise<void> => {
    try {
      const response = await getReqClients();
      const clientes: ClientRequest[] = response.data;
      const encontrado = clientes.find((c) => c.email === email);
      setCliente(encontrado || null);
    } catch (err) {
      console.error("Erro ao carregar cliente:", err);
    }
  };

  useEffect(() => {
    loadClient();
  }, [email]);

  const generatePDF = async (pedido: Pedido): Promise<void> => {
    const element = document.createElement("div");
    element.style.width = "210mm";
    element.style.padding = "20mm";
    element.style.fontFamily = "Arial, sans-serif";
    element.style.backgroundColor = "white";

    element.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #1e40af; margin-bottom: 5px;">Resposta ao Pedido</h1>
        <p style="color: #6b7280; margin: 0;">Pedido #${pedido.n_pedido}</p>
      </div>
      <div style="margin-bottom: 20px;">
        <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Detalhes do Pedido</h2>
        <p><strong>Data:</strong> ${pedido.data}</p>
        <p><strong>Status:</strong> ${pedido.status}</p>
      </div>
      <div style="margin-bottom: 20px;">
        <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Requisição</h2>
        <div style="background-color: #f9fafb; color: #000000; padding: 15px; border-radius: 8px; border-left: 4px solid #1e40af;">
          ${pedido.requisicao}
        </div>
      </div>
      <div style="margin-bottom: 20px;">
        <h2 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Resposta</h2>
        <div style="background-color: #f9fafb; color: #000000; padding: 15px; border-radius: 8px; border-left: 4px solid #1e40af;">
          ${pedido.resposta}
        </div>
      </div>
      <div style="margin-top: 30px; text-align: center; color: #9ca3af; font-size: 12px;">
        <p>Documento gerado automaticamente em ${new Date().toLocaleDateString()}</p>
        <p>RCS</p>
      </div>
    `;

    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      document.body.removeChild(element);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`pedido-${email}-${ new Date().toLocaleDateString()}.pdf`); // <-- Baixa o PDF
    } catch (error) {
      document.body.removeChild(element);
      console.error("Erro ao gerar PDF:", error);
    }
  };

  const handleDelete = async (pedidoId: string): Promise<void> => {
    if (!window.confirm("Tem certeza que deseja apagar este pedido?")) return;
    setLoading((prev) => ({ ...prev, [pedidoId]: true }));
    try {
      await deletePedido(pedidoId);
      setCliente((prev) =>
        prev
          ? { ...prev, pedidos: prev.pedidos.filter((p) => p.id !== pedidoId) }
          : null
      );
    } catch (err) {
      console.error("Erro ao apagar pedido:", err);
      alert("Erro ao apagar pedido.");
    } finally {
      setLoading((prev) => ({ ...prev, [pedidoId]: false }));
    }
  };

  if (!cliente) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-stone-600">Cliente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-stone-500 hover:text-stone-600 transition-colors mb-4 text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para o dashboard
          </Link>

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              Pedidos de {cliente.email}
            </h2>
            <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              {cliente.pedidos.length}{" "}
              {cliente.pedidos.length === 1 ? "pedido" : "pedidos"}
            </span>
          </div>
          <p className="text-stone-600">
            Empresa: <span className="font-medium">{cliente.empresa}</span>
          </p>
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-5">
          {cliente.pedidos.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-stone-200">
              <p className="text-stone-500">Nenhum pedido encontrado.</p>
            </div>
          ) : (
            cliente.pedidos
            .map((pedido, index) => (
              <div
                key={pedido.id || index}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <div className="flex items-center mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          pedido.status === "concluído"
                            ? "bg-green-100 text-green-800"
                            : pedido.status === "pendente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {pedido.status}
                      </span>
                      <span className="ml-3 text-sm text-stone-500">
                        {pedido.data}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-stone-500 mb-1">
                      Requisição
                    </p>
                    <p className="text-stone-800 bg-stone-50 p-3 rounded-lg text-sm">
                      {pedido.requisicao}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-500 mb-1">
                      Resposta
                    </p>
                    <p className="text-stone-800 bg-stone-50 p-3 rounded-lg text-sm">
                      {pedido.resposta}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => generatePDF(pedido)}
                    className="px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Baixar PDF
                  </button>
                  <button className="px-4 py-2 bg-white border border-stone-200 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-300">
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pedido.id)}
                    disabled={loading[pedido.id]}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading[pedido.id] ? "Apagando..." : "Apagar"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
