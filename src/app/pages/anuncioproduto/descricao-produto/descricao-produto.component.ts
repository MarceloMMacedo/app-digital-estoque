import { DescricaoAnuncio } from './../../../models/descricao-anuncio';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-descricao-produto',
  templateUrl: './descricao-produto.component.html',
  styleUrls: ['./descricao-produto.component.css']
})
export class DescricaoProdutoComponent implements OnInit {

  @Input() descricaoAnuncio:DescricaoAnuncio;

  constructor() { }

  ngOnInit(): void {
  }

}
