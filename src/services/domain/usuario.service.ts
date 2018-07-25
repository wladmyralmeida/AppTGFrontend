import { StorageService } from '../storage.service';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../../models/usuario.dto';

@Injectable()
export class UsuarioService{
    constructor (
        public http : HttpClient, 
        public storage : StorageService){
    }

    findByEmail(email : string) : Observable<UsuarioDTO>{
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/up${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}