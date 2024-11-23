import { TestBed } from '@angular/core/testing';

import { HttpInterceptorBasicAuthenticationService } from './http-interceptor-basic-authentication.service';

describe('HttpInterceptorBasicAuthenticationService', () => {
  let service: HttpInterceptorBasicAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptorBasicAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
