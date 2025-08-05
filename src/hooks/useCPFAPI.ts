import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface CPFData {
  cpf: string;
  nome: string;
  situacao: string;
  dataInscricao: string;
  nascimento: string;
  municipio?: string;
  uf?: string;
  nomeCompleto?: string;
  rg?: string;
  tituloEleitor?: string;
  pis?: string;
}

interface CPFResponse {
  success: boolean;
  data?: CPFData;
  error?: string;
}

export const useCPFAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CPFData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data para demonstração
  const generateMockData = (cpf: string): CPFData => {
    const names = [
      "João Silva Santos",
      "Maria Oliveira Costa",
      "Pedro Souza Lima", 
      "Ana Paula Ferreira",
      "Carlos Eduardo Almeida",
      "Lucia Helena Ribeiro"
    ];
    
    const situations = ["REGULAR", "IRREGULAR", "SUSPENSO"];
    const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Brasília", "Curitiba"];
    const states = ["SP", "RJ", "MG", "BA", "DF", "PR"];
    
    const randomIndex = Math.floor(Math.random() * names.length);
    const cityIndex = Math.floor(Math.random() * cities.length);
    
    return {
      cpf,
      nome: names[randomIndex],
      situacao: situations[Math.floor(Math.random() * situations.length)],
      dataInscricao: "2010-03-15T00:00:00.000Z",
      nascimento: `${1950 + Math.floor(Math.random() * 50)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}T00:00:00.000Z`,
      municipio: cities[cityIndex],
      uf: states[cityIndex],
      nomeCompleto: names[randomIndex],
      rg: String(Math.floor(Math.random() * 90000000) + 10000000),
      tituloEleitor: String(Math.floor(Math.random() * 900000000000) + 100000000000),
      pis: String(Math.floor(Math.random() * 90000000000) + 10000000000)
    };
  };

  const searchCPF = useCallback(async (cpf: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // Simulação de chamada à API
      // Em produção, isso seria uma chamada real através de Edge Function do Supabase
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay da API
      
      // Simula diferentes cenários baseado no CPF
      const lastDigit = parseInt(cpf.slice(-1));
      
      if (lastDigit === 0) {
        throw new Error("CPF não encontrado na base de dados");
      }
      
      if (lastDigit === 1) {
        throw new Error("Erro de autenticação - Token inválido");
      }
      
      if (lastDigit === 2) {
        throw new Error("Limite de consultas excedido");
      }

      const mockData = generateMockData(cpf);
      setData(mockData);

      toast({
        title: "Consulta realizada com sucesso",
        description: `Dados do CPF ${cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")} encontrados.`,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido na consulta";
      setError(errorMessage);
      
      toast({
        title: "Erro na consulta",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearResults = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    isLoading,
    data,
    error,
    searchCPF,
    clearResults
  };
};