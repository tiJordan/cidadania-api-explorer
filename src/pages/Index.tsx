import { useState } from "react";
import { CPFSearchForm } from "@/components/CPFSearchForm";
import { CPFResult } from "@/components/CPFResult";
import { APIStatus } from "@/components/APIStatus";
import { useCPFAPI } from "@/hooks/useCPFAPI";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Database, Search } from "lucide-react";

const Index = () => {
  const { isLoading, data, error, searchCPF, clearResults } = useCPFAPI();
  const [activeTab, setActiveTab] = useState("search");

  const handleSearch = (cpf: string) => {
    searchCPF(cpf);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Consulta CPF Brasil</h1>
              <p className="text-primary-foreground/80">
                Sistema de consulta ao Cadastro Base do Cidadão
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Consulta
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              API Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            <div className="flex flex-col items-center space-y-8">
              <CPFSearchForm onSearch={handleSearch} isLoading={isLoading} />
              
              {(data || error) && (
                <div className="space-y-4">
                  <CPFResult data={data} error={error} />
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={clearResults}
                      className="mt-4"
                    >
                      Nova Consulta
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="status">
            <div className="flex justify-center">
              <APIStatus />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Sistema desenvolvido para consulta ao Cadastro Base do Cidadão (CBC-CPF)
          </p>
          <p className="text-xs mt-2">
            API oficial: gov.br/conecta • Dados para demonstração apenas
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
