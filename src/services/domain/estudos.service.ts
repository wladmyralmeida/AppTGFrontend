import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstudoDTO } from "../../models/estudo.dto";

@Injectable()
export class EstudosService {

    constructor(public http: HttpClient) {
    }

    insert(obj: EstudoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/estudos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
