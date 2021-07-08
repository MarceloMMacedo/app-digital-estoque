import { AgregadoGrupoFinanceiro } from './agregado-grupo-financeiro';
export interface GrupoFinanceiroAnuncio {
  id: number;
  nome?: string;
  descricao?: string;
  percentualDesconto?:number;
	percentualTotal?:number;
 agregadoGrupo?:AgregadoGrupoFinanceiro[];
}
