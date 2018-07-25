import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { UsuarioDTO } from '../../models/usuario.dto';

@Injectable()
export class UsuarioService{
    constructor (public http : HttpClient, public storage : StorageService){
        
    }

    findByEmail(email : string) : Observable<UsuarioDTO>{

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<UsuarioDTO>(
            `${API_CONFIG.baseUrl}/usuarios/email?value=${email}`, 
            {'headers': authHeader});
    }

    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/up${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}