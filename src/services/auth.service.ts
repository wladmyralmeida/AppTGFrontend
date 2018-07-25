import { LocalUser } from './../models/local_user';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "../../node_modules/@angular/core";
import { HttpClient } from '../../node_modules/@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService{

    jwtHelper : JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage : StorageService){

    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, 
        {
            observe:'response',
            responseType: 'text' 
        });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok,
            email : this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}