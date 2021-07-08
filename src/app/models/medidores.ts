import { SampleDto } from './sample-dto';
export interface Medidores {
   medidorA4Inicial?:number;
   medidorA4Final?:number;
   medidorA3Inicial?:number;
   medidorA3Final?:number;
   producaoA3?:number;
   producaoA4?:number;
   dataMedidor?:Date;
   oS?:SampleDto;
   medidorA4Patrimonio?:number;
   medidorA3Patrimonio?:number;
   producaoConvertidaA4?:number;
   producaoConvertidaA3?:number;
}
