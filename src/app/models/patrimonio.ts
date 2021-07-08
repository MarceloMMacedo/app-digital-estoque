import { Medidores } from './medidores';
import { SampleDto } from './sample-dto';
export interface Patrimonio {
  id?: number;
  nome?: string;
  descricao?: string;
  imagem?: string;
  tipo?: string;
  modelo?: SampleDto;
  codPatrimonio: string;
  medidoresInicial?: Medidores;
  medidores?: Medidores[];
  contrato: SampleDto;
  medidorServico?: Medidores;
  medidorContrato?: Medidores;
  serial?:string;
}
