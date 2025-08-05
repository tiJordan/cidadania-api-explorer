import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Database, Key, Link2, RefreshCw, Shield } from "lucide-react";

interface APIEndpoint {
  name: string;
  path: string;
  method: string;
  description: string;
  status: "available" | "requires-auth" | "not-implemented";
}

const API_ENDPOINTS: APIEndpoint[] = [
  {
    name: "Consulta CPF Básica",
    path: "/cpf/{cpf}",
    method: "GET",
    description: "Consulta informações básicas do CPF",
    status: "requires-auth"
  },
  {
    name: "Consulta CPF Completa",
    path: "/cpf/{cpf}/completo",
    method: "GET", 
    description: "Consulta informações completas do CPF",
    status: "requires-auth"
  },
  {
    name: "Validar CPF",
    path: "/cpf/{cpf}/validar",
    method: "GET",
    description: "Valida se o CPF existe e está ativo",
    status: "requires-auth"
  },
  {
    name: "Histórico CPF",
    path: "/cpf/{cpf}/historico",
    method: "GET",
    description: "Consulta histórico de alterações do CPF",
    status: "requires-auth"
  },
  {
    name: "Situação Cadastral",
    path: "/cpf/{cpf}/situacao",
    method: "GET",
    description: "Consulta situação cadastral atual",
    status: "requires-auth"
  }
];

export const APIStatus = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success text-success-foreground";
      case "requires-auth":
        return "bg-warning text-warning-foreground";
      case "not-implemented":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Disponível";
      case "requires-auth":
        return "Requer Autenticação";
      case "not-implemented":
        return "Não Implementado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle>Status da API CBC-CPF</CardTitle>
        </div>
        <CardDescription>
          Estado atual das funcionalidades da API do Cadastro Base do Cidadão
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuração de Autenticação */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Configuração de Autenticação</h3>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="font-medium text-warning-foreground">
                  Integração com Supabase Necessária
                </p>
                <p className="text-sm text-muted-foreground">
                  Para consumir a API do CBC-CPF com segurança, conecte seu projeto ao Supabase. 
                  Isso permitirá criar Edge Functions para gerenciar autenticação OAuth2 e armazenar tokens com segurança.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <Key className="h-4 w-4" />
                  <span className="text-sm font-medium">Recursos necessários:</span>
                </div>
                <ul className="text-sm text-muted-foreground ml-4 space-y-1">
                  <li>• Edge Functions para proxy da API</li>
                  <li>• Armazenamento seguro de tokens OAuth2</li>
                  <li>• Gerenciamento de autenticação</li>
                  <li>• Logs de auditoria</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Endpoints Disponíveis */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold">Endpoints da API</h3>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar Status
            </Button>
          </div>
          
          <div className="space-y-3">
            {API_ENDPOINTS.map((endpoint, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-xs">
                      {endpoint.method}
                    </Badge>
                    <span className="font-medium">{endpoint.name}</span>
                  </div>
                  <Badge className={getStatusColor(endpoint.status)}>
                    {getStatusText(endpoint.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {endpoint.path}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Documentação */}
        <div className="space-y-4">
          <h3 className="font-semibold">Documentação Oficial</h3>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Para mais informações sobre a API do Cadastro Base do Cidadão:
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.gov.br/conecta/catalogo/apis/cadastro-base-do-cidadao-cbc-cpf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                📋 Documentação da API CBC-CPF
              </a>
              <a 
                href="https://www.gov.br/conecta/catalogo/apis/cadastro-base-do-cidadao-cbc-cpf/swagger.json/swagger_view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                🔧 Swagger/OpenAPI Specification
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};