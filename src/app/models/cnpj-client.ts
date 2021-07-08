import { Billing } from './billing';
import { QualName } from './qual-name';
import { TextCode } from './text-code';
export interface CnpjClient {
  atividade_principal?: TextCode[],
  data_situacao?: string;
  tipo?: string;
  nome?: string;
  uf?: string;
  telefone?: string;
  atividades_secundarias?: TextCode[],
  qsa?: QualName[],
  situacao?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  cep?: string;
  municipio?: string;
  porte?: string;
  abertura?: string;
  natureza_juridica?: string;
  fantasia?: string;
  cnpj?: string;
  ultima_atualizacao?: string;
  status?: string;
  complemento?: string;
  email?: string;
  efr?: string;
  motivo_situacao?: string;
  situacao_especial?: string;
  data_situacao_especial?: string;
  capital_social?: string;
  extra?: any;
  billing?: Billing;

}
