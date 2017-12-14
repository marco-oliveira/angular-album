import { Component } from "@angular/core";
import { FotoComponent } from "../foto/foto.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from "../foto/foto.service";

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent{

    foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    servico: FotoService;

    constructor(servico: FotoService, fb: FormBuilder) {

        this.servico = servico;

        this.meuForm = fb.group({
            titulo: ['', Validators.compose(
                [Validators.required, Validators.minLength(4)]
            )],
            url: ['', Validators.required],
            descricao: [''],
        });
    }
    cadastrar(event){

        event.preventDefault();

        this.servico
            .cadastra(this.foto)
             .subscribe(()=>{
                 console.log('Foto Cadastrada com sucesso!');
                 this.foto = new FotoComponent();
             }, error => console.log(error));
    }


}