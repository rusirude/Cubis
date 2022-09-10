export interface ListResponse<T>{
    channel:string,
    code:string,
    message:string,
    totalSize:number
    data:T
}
