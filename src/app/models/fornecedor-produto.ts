import { SampleDto } from './sample-dto';
import { Fornecedor } from './fornecedor';
export interface FornecedorProduto {
id?:number;
    nome?:string;
    fornecedor?:SampleDto;
    valor:number;
}
