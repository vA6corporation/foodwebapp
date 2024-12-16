import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    private baseUrl: string = environment.baseUrl

    get(url: string, params?: Params): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.get(`${this.baseUrl}${url}`, { headers, params })
    }

    post(url: string, body: any, params?: Params): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.post(`${this.baseUrl}${url}`, body, { headers, params })
    }

    put(url: string, body: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.put(`${this.baseUrl}${url}`, body, { headers })
    }

    delete(url: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        })
        return this.http.delete(`${this.baseUrl}${url}`, { headers })
    }
}
