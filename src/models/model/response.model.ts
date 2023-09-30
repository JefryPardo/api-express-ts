export class ResponseModel {
    
    code     : string;
    response : any;

    constructor(code:string, response:any) {

        this.code       = code;
        this.response   = response;
    }
}