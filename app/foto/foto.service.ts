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

    cadastra(foto: FotoComponent): Observable<Response>{

        return this.http
            .post(this.url, JSON.stringify(foto), { headers: this.headers });
    }

    lista(): Observable<FotoComponent[]>{
        return this.http.get(this.url)
            .map(res => res.json());
    }

    remove(foto: FotoComponent): Observable<Response>{

        return this.http.delete(this.url+ '/' + foto._id)

    }

}