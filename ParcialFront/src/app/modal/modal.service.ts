import { BehaviorSubject } from "rxjs";
import { dueniosModels } from "../Models/dueniosModels";
import { Injectable } from "@angular/core";
import { mascotasModels } from "../Models/mascotasModels";
import { comidasModels } from "../Models/comidasModels";



@Injectable({
    providedIn: 'root'
})


export class ModalService {

    duenios:dueniosModels;
    mascotas:mascotasModels;
    comidas:comidasModels;

    titulo = "";
    acciones = new BehaviorSubject('');
    constructor(){ }
}