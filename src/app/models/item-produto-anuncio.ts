import { SampleDto } from './sample-dto';
import { BaseDto } from './base-dto';
export interface ItemProdutoAnuncio {
  produto?: SampleDto;
  quantidade?: number;
  valor?: number;
  subtotal?: number;
  descricao?: string;
}
