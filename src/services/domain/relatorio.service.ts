import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { RelatorioDTO } from "../../models/relatorio.dto";

@Injectable()
export class RelatorioService {

    constructor(public http: HttpClient) {
    }

    insert(obj: RelatorioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/relatorios`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
