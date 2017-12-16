import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { FotoComponent } from "./foto.component";

@Injectable()
export class FotoService{

    http: Http;
    headers: Headers;
    url: string;

    constructor(http: Http){
        this.http = http;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.url = 'v1/fotos';
    }

    cadastra(foto: FotoComponent): Observable<MensagemCadastro>{

        if(foto._id){
            return this.http
                .put(this.url+'/'+foto._id, JSON.stringify(foto), { headers: this.headers})
                .map(() => new MensagemCadastro('Foto Alterada com sucesso!', false));
        }else{
            return this.http
                .post(this.url, JSON.stringify(foto), { headers: this.headers })
                .map(() => new MensagemCadastro('Foto Cadastrada com sucesso!', true));
        }
    }

    lista(): Observable<FotoComponent[]>{
        return this.http.get(this.url)
            .map(res => res.json());
    }

    remove(foto: FotoComponent): Observable<Response>{

        return this.http.delete(this.url+ '/' + foto._id)

    }

    buscaPorId(id: string): Observable<FotoComponent> {
        return this.http.get(this.url + '/' +id)
            .map(res => res.json());
    }
}

export class MensagemCadastro{

    constructor(private _mensagem: string, private _inclusao: boolean){

        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    get mensagem(): string{
        return this._mensagem;
    }

    get inclusao(): boolean{

        return this._inclusao;
    }

}