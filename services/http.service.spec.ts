import { TestBed, inject} from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from './http.service';
import { Http, BaseRequestOptions,ConnectionBackend ,RequestOptions,HttpModule} from '@angular/http';

describe('HttpService', () => {
  let httpService : HttpService;
  beforeEach(() => {
    //config
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HttpService,
        Http,
        ConnectionBackend
      ]
    });
    //
    httpService  = TestBed.get(HttpService);
  });
  it('should be created', () => {
      expect(httpService).toBeTruthy();
  });
  it('generateHttpHeaders() should return object-header after work', () => {
      expect(httpService.generateHttpHeaders()).toBeTruthy();
  });

});
