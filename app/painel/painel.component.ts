import {Component, ElementRef, Input, OnInit} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit{

    @Input() titulo: string;

    private elemento: ElementRef;

    constructor(elemento: ElementRef){
        this.elemento = elemento;
    }

    ngOnInit(): void {
        this.titulo = this.titulo.length > 7 ?
            this.titulo.substr(0,7)+'...' : this.titulo;
    }

    fadeOut(cb){
        $(this.elemento.nativeElement).fadeOut(cb);
    }
}