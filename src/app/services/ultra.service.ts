import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/ultra';
import { CookieService } from 'ngx-cookie-service';

interface TokenResponse {
  message: string,
  user_id: string,
  token: string
}

export interface Pass {
  latitude: number,
  longitude: number,
  elevation_m: number,
  aos_utc: Date,
  los_utc: Date
}

@Injectable({
  providedIn: 'root'
})

export class UltraService {
  token: string = null;
  username: string = null;
  requests: Array<Pass>;

  constructor(private http: HttpClient,
              private cookie_service: CookieService){
    this.username = this.fetch_username();
    this.token = this.fetch_token();
  }

  fetch_username(): string {
    if(this.username === null && this.cookie_service.check('username')){
       this.username = this.cookie_service.get('username');
    }
    return this.username;
  }

  fetch_token(): string {
    if(this.token === null && this.cookie_service.check('token')){
       this.token = this.cookie_service.get('token');
    }
    else {
      this.token = null;
    }
    return this.token;
  }

  store_user(username: string, token: string): void {
    console.log(`Storing to cookies: ${username} ${token}`);
    this.cookie_service.set('username', username);
    this.cookie_service.set('token', token);
    this.username = username;
    this.token = token;
  }

  get_telemetry() : Observable<any> {
    const uri = `${environment.ultra_url}/telemetry`;
    return this.http.get(uri, {observe: 'body'});
  }

  get_user(): Observable<any> {
    const uri = `${environment.ultra_url}/user`;
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(uri, {'headers': headers, observe: 'body'});
  }

  post_new_user(username: string): void {
    const uri = `${environment.ultra_url}/user`;
    const request = this.http.post<TokenResponse> (uri, {user_id: username, observe: 'body'});
    request.subscribe((data) => {
      this.token = data.token;
      this.username = data.user_id;
      this.store_user(data.user_id, data.token);
    });
  }

  get_all_requests(): Array<Pass> {
    const uri = `${environment.ultra_url}/request`;
    const headers = new HttpHeaders().set('token', this.token);
    const response = this.http.get<Array<Pass>>(uri, {'headers': headers, observe: 'body'});
    response.subscribe((response) => {
      this.requests = response;
    });
    return this.requests;
  }

  post_new_requests(): void {
    const uri = `${environment.ultra_url}/request`;
    const headers = new HttpHeaders().set('token', this.token);
    const request = this.http.post(uri, {'headers': headers, observe: 'body'});
    // TODO: Finish this
  }

  get_passes(latitude: number, longitude: number): Array<Pass> {
    const uri = `${environment.ultra_url}/passes`;
    const parameters = new HttpParams()
                       .append('latitude', latitude.toString())
                       .append('longitude', longitude.toString());
    this.http.get<Array<Pass>>(`${uri}?${parameters}`).subscribe((data) => {
      this.requests = data;
    });
    return this.requests;
  }
}
