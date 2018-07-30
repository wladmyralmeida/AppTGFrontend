export interface UsuarioDTO{
    id : string;
    nome : string;
    numero : string;
    email : string;
    senha: string;
    organizacaoMilitar : string;
    pelotao : string;
    patente : string;
    tipoSangue : string;
    status : boolean;
    imageUrl? : string;
}
