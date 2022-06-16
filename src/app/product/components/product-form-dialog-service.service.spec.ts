import { TestBed } from '@angular/core/testing';

import { ProductFormDialogServiceService } from './product-form-dialog-service.service';

describe('ProductFormDialogServiceService', () => {
  let service: ProductFormDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFormDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
