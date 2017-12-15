import { Component } from "@angular/core";
import { FotoComponent } from "../foto/foto.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from "../foto/foto.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent{

    foto: FotoComponent = new FotoComponent();
    meuForm: FormGroup;
    servico: FotoService;
    route: ActivatedRoute;
    router: Router;

    constructor(servico: FotoService, fb: FormBuilder, route: ActivatedRoute, router: Router) {

        this.servico = servico;

        this.route = route;

        this.router = router;

        this.route.params.subscribe(params =>{
            let id = params['id'];
            if(id){
                this.servico.buscaPorId(id)
                    .subscribe(foto =>
                        this.foto = foto, error =>
                        console.log(error));
            }

        })

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
                 this.router.navigate(['']);
             }, error => console.log(error));
    }


}