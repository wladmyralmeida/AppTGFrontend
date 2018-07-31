import { UsuarioDTO } from "./usuario.dto";

export interface ServicoDTO{
    id : string;
    data : Date;
    usuario : UsuarioDTO;
}