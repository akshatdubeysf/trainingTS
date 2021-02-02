import { formatDate } from './app.decorator';
export class User {
    firstName: string = '';
    middleName?: string;
    lastName?: string;
    email:string = '';
    phoneNumber?:string;
    role:Roles = Roles.Subscriber;
    address?:string;
    @formatDate()
    createdOn?:string;
    @formatDate()
    modifiedOn?:string;
    editable?: boolean;
    constructor(ob?: User) {
        if(ob)
            Object.assign(this, ob);
    }
}

export class TableModel<T> {
    columns: ColumnModel<T>[] = [];
    constructor(){}
}

export interface ColumnModel<T>{
    name: string;
    id: keyof T;
    readonly?: boolean;
    map: (e:any) => any;
}

export enum Roles {
    SuperAdmin,
    Admin,
    Subscriber
}