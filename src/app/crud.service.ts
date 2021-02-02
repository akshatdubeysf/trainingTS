import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { User } from "./app.model";

@Injectable({
    providedIn: 'root'
})
export class CrudService<T> {
    constructor(private http: HttpClient) { }
    state?: Array<T>;
    private base: string = 'http://localhost:3000/users';

    read(): Observable<T[]> {
        return this.http.get<T[]>(this.base);
    }

    add(model: T): Observable<any> {
        return this.http.post<any>(this.base, model);
    }

    update(model: T, email: string): Observable<any> {
        return this.http.patch(this.base + '/' + email , model);
    }

    delete(email: string): Observable<any> {
        return this.http.delete(this.base + '/' + email)
    }
}
