import { Common } from "./common/common.interface";

export interface Section extends Common{
    uuid:string,
    description:string,
    status:string
}
