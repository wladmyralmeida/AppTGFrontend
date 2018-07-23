import { CategoriaDTO } from './../../models/categoria.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { Observable } from '../../../node_modules/rxjs/Rx';

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){

    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}