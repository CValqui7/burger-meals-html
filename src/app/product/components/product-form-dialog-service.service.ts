import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductFormDialogComponent } from './product-form-dialog/product-form-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProductFormDialogServiceService {
  componentRef: MatDialogRef<ProductFormDialogComponent>;
  constructor(
    public dialog: MatDialog
  ) { }

  loadComponent(title: string, record: any): Observable<boolean> {
this.componentRef = this.dialog.open(ProductFormDialogComponent, {
  width: '1000px',
  disableClose: true,
  data: {
    title,
    record
  }
});
return this.componentRef.afterClosed().pipe(map(it => {
  return it;
}));
  }
}
