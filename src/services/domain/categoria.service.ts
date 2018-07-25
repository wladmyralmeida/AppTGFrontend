import { HttpClient } from '@angular/common/http';
import { CategoriaDTO } from '../../models/categoria.dto'
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { Injectable } from '../../../node_modules/@angular/core';

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){

    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}