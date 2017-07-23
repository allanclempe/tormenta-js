import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpIdeApi } from '../shared';

@Injectable()
export class IdentityService {

    constructor(private http: HttpIdeApi) { }

    /**
     * Login to identity system.
     *
     * @param email
     * @param password
     * @returns {Observable<Response>}
     */
    public login(email: string, password: string): Observable<any> {
        return this.http.post('api/identity/user/login', {
            email, password
        }).map((response) => response.json());
    }

    /**
     * Get all projects
     *
     * @returns {Observable<Response>}
     */
    public projects(): Observable<any> {
        return this.http.get('api/identity/project').map((response) => response.json());
    }

    /**
     * Get environment by id
     *
     * @returns {Observable<Response>}
     */
    public environment(id: string): Observable<any> {
        return this.http.get(`api/identity/environment/${id}`).map((response) => response.json());
    }
}
