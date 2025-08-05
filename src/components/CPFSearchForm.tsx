import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CPFSearchFormProps {
  onSearch: (cpf: string) => void;
  isLoading: boolean;
}

export const CPFSearchForm = ({ onSearch, isLoading }: CPFSearchFormProps) => {
  const [cpf, setCpf] = useState("");
  const { toast } = useToast();

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .slice(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const validateCPF = (cpf: string): boolean => {
    const numbers = cpf.replace(/\D/g, "");
    if (numbers.length !== 11) return false;
    
    // Validação básica de CPF
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanCPF = cpf.replace(/\D/g, "");
    
    if (!validateCPF(cpf)) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, digite um CPF válido com 11 dígitos.",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(cleanCPF);
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <ShieldCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle>Consulta CPF</CardTitle>
        <CardDescription>
          Digite o CPF para consultar informações no Cadastro Base do Cidadão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCPFChange}
              maxLength={14}
              className="text-center font-mono"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Consultando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Consultar CPF
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};