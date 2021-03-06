import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { DesempenhoDTO } from "../../models/desempenho.dto";

@Injectable()
export class DesempenhoService {

    constructor(public http: HttpClient) {
    }

    insert(obj: DesempenhoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/desempenhos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
