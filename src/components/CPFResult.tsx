import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, User, Calendar, MapPin, FileText } from "lucide-react";

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

interface CPFResultProps {
  data: CPFData | null;
  error?: string;
}

export const CPFResult = ({ data, error }: CPFResultProps) => {
  if (error) {
    return (
      <Card className="w-full max-w-2xl border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Erro na Consulta</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const getSituacaoColor = (situacao: string) => {
    switch (situacao.toLowerCase()) {
      case "regular":
        return "bg-success text-success-foreground";
      case "irregular":
        return "bg-destructive text-destructive-foreground";
      case "suspenso":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch {
      return dateString;
    }
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          <CardTitle>Dados do CPF</CardTitle>
        </div>
        <CardDescription>
          Informações obtidas do Cadastro Base do Cidadão
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Informações Pessoais</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">CPF</label>
              <p className="font-mono">{formatCPF(data.cpf)}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Situação</label>
              <div className="flex items-center gap-2">
                <Badge className={getSituacaoColor(data.situacao)}>
                  {data.situacao}
                </Badge>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              <p className="font-medium">{data.nome}</p>
            </div>
            
            {data.nomeCompleto && data.nomeCompleto !== data.nome && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                <p>{data.nomeCompleto}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Datas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Datas</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Nascimento</label>
              <p>{formatDate(data.nascimento)}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Data de Inscrição</label>
              <p>{formatDate(data.dataInscricao)}</p>
            </div>
          </div>
        </div>

        {/* Localização */}
        {(data.municipio || data.uf) && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Localização</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.municipio && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Município</label>
                    <p>{data.municipio}</p>
                  </div>
                )}
                
                {data.uf && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">UF</label>
                    <p>{data.uf}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Outros Documentos */}
        {(data.rg || data.tituloEleitor || data.pis) && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">Outros Documentos</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.rg && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">RG</label>
                    <p className="font-mono">{data.rg}</p>
                  </div>
                )}
                
                {data.tituloEleitor && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Título de Eleitor</label>
                    <p className="font-mono">{data.tituloEleitor}</p>
                  </div>
                )}
                
                {data.pis && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">PIS</label>
                    <p className="font-mono">{data.pis}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};