import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {
    private env = environment;
    constructor(private http: Http) { }
    generateHttpHeaders() {
    return new Headers( {'Content-Type': 'application/json;charset=utf-8'} );
    // return new Headers( {'Access-Control-Allow-Origin': 'http://localhost:4200'} );
    }
    // Orders_logic
    // ADD ORDER
    addOrder(form) {
    const headers = this.generateHttpHeaders();
    const body = JSON.stringify(form);
    return this.http.post(this.env.api + 'v1/ads/', body, {headers});
    }
    // GET order
    getOrder(id) {
    const headers = this.generateHttpHeaders();
    const data = id;
    return this.http.get(this.env.api + 'v1/ads/' + data, {headers});
    }
    // DELETE order
    deleteOrder(id) {
    const headers = this.generateHttpHeaders();
    const data = id;
    return this.http.delete(this.env.api + 'v1/ads/' + data, {headers});
    }
    // UPDATE order
    updateOrder(id, form) {
    const headers = this.generateHttpHeaders();
    const updateId = id;
    const body = JSON.stringify(form);
    return this.http.put(this.env.api + 'v1/ads/' + updateId, body, {headers});
    }
}
