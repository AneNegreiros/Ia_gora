import { FileText, Search, Download, Share2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function PDFReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-gray-700" />
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">Contrato_Aluguel_2026.pdf</h1>
              <p className="text-xs text-gray-500">1.2 MB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-700 min-w-24 text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ZoomOut className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-700 min-w-12 text-center">100%</span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Document View */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-12 min-h-[800px]">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                CONTRATO DE LOCAÇÃO RESIDENCIAL
              </h2>
              <p className="text-sm text-gray-600">Página {currentPage} de {totalPages}</p>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-justify">
                Pelo presente instrumento particular de contrato de locação que entre si fazem,
                de um lado como LOCADOR e de outro como LOCATÁRIO, têm entre si justo e acordado
                o seguinte:
              </p>

              <div className="font-semibold mt-6">CLÁUSULA PRIMEIRA - DO OBJETO</div>
              <p className="text-justify">
                O LOCADOR é legítimo proprietário do imóvel situado na Rua das Flores, nº 123,
                Bairro Centro, São Paulo/SP, CEP 01234-567, e o dá em locação ao LOCATÁRIO,
                que o aceita nas condições estabelecidas neste contrato.
              </p>

              <div className="font-semibold mt-6">CLÁUSULA SEGUNDA - DO PRAZO</div>
              <p className="text-justify">
                A locação vigorará pelo prazo de 30 (trinta) meses, com início em 01/01/2026
                e término em 30/06/2028, podendo ser prorrogado mediante acordo entre as partes.
              </p>

              <div className="font-semibold mt-6">CLÁUSULA TERCEIRA - DO ALUGUEL</div>
              <p className="text-justify">
                O LOCATÁRIO pagará ao LOCADOR, a título de aluguel mensal, a importância de
                R$ 2.500,00 (dois mil e quinhentos reais), a ser reajustada anualmente pelo
                índice IGP-M ou outro que vier a substituí-lo.
              </p>

              <div className="font-semibold mt-6">CLÁUSULA QUARTA - DA FORMA DE PAGAMENTO</div>
              <p className="text-justify">
                O aluguel deverá ser pago até o dia 10 (dez) de cada mês, mediante depósito
                bancário ou transferência para a conta indicada pelo LOCADOR...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
