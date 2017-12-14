import { Component } from "@angular/core";
import {FotoService} from "../foto/foto.service";

@Component({
    moduleId: module.id,
    selector: 'listagem',
    templateUrl: './listagem.component.html'
})
export class ListagemComponent{

    fotos: Object[] = [];

    service: FotoService;
    private mensagem: string = '';

    constructor(service: FotoService){
        this.service = service;
        this.service.lista()
            .subscribe(fotos => this.fotos = fotos,
                    error => console.log(error));
    }

    remover(foto){
        this.service.remove(foto)
            .subscribe(() => {

                let novoArray = this.fotos.slice(0);
                let indice = novoArray.indexOf(foto);
                novoArray.splice(indice, 1);
                this.fotos = novoArray;

                this.mensagem = 'Foto removida com sucesso!';

            }, error => {
                console.log(error);
                this.mensagem = 'Erro ao tentar remover foto!';
            })
    }

}