import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from "./app.model";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) { }

    fetchData(): Observable<User[]> {
        return this.http.get<User[]>("/assets/data.json").pipe(
            map(r => r.map(u => new User(u)))
        );
    }
}