import { ListaImagens } from './lista-imagens';
import { ItemProdutoAnuncio } from './item-produto-anuncio';
import { GrupoFinanceiroAnuncio } from './grupo-financeiro-anuncio';
import { SampleDto } from './sample-dto';
import { BaseDto } from './base-dto';
import { DescricaoAnuncio } from './descricao-anuncio';
export interface AnuncioLoja {

  id?: number;
  nome?: string;
  descricao?: string;
  grupopreco?: GrupoFinanceiroAnuncio;
  dataVencimento?: Date;
  saldo?: number;
  saldoMinimo?: number;
  saldoReserva?: number;
  saldoMaximo?: number;
  status?: string;
 // valorInterno?: number;
 saldoReposicao?:number;
  valorFinal?: number;
  peso?: number;
  largura?: number;
  comprimento?: number;
  altura?: number;
  unidade?: string;
  itensProduto?: ItemProdutoAnuncio[];
  descricoes?: DescricaoAnuncio[];
  imagens?: ListaImagens[];
  imagem?: string;

}
