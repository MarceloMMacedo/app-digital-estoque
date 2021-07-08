import { SampleDto } from './sample-dto';
import { FornecedorProduto } from './fornecedor-produto';
import { Modelo } from './modelo';
export interface Produto {
    id?: number;
    categoria?:string;
    nome?:string;
    modelo?: SampleDto;
    descricao?: string;
    imagem1?: string;
    imagem2?: string;
    imagem?: string;
    fabricante?: string;
    peso?: number;
    largura?: number;
    comprimento?: number;
    altura?: number;
    unidade?: string;
    status?: string;
    isvalue?: string;
    valorFornecedo?: number;
    valorfinal?: number;
    valorinterno?: number;
    fornecedoresproduto?: FornecedorProduto[];
}

export interface ProdutoDto {
    id?: number;
    categorias: [];
    nome?:string;
    modeloid?: number;
    modelonome:string;
    descricao?: string;
    imagem1?: string;
    imagem2?: string;
    imagem?: string;
    fabricante?: string;
    fornecedores?: FornecedorProduto[];
    tipo?: string;
    peso?: number;
    largura?: number;
    comprimento?: number;
    altura?: number;
    unidade?: string;
    status?: string;
    isvalue?: boolean;
    valorFornecedo?: number;
    valorfinal?: number;
    valorinterno?: number;



}
