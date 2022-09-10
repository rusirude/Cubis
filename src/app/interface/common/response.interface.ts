export interface Response<T>{
    channel:string,
    code:string,
    message:string,
    key:string
    data:T
}
