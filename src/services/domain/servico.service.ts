import { ImageUtilService } from './../image-util.service';
import { StorageService } from './../storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ServicoService {

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {
    }

}