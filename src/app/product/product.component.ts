import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ProductFormDialogServiceService } from './components/product-form-dialog-service.service';
import { ProductService } from './components/services/product.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: any[] = ['name', 'description', 'precio'];
  displayedColumnsconst: any[] = ['name', 'description', 'precio'];
  dataSource = new MatTableDataSource([{ name: 'combo1', description: 'este es combo 1', precio: 20.0 }, { name: 'combo1', description: 'este es combo 1', precio: 20.0 }]);
  animal: string = '';
  name: string = '';
  constructor(public dialog: MatDialog,
    private productFormService: ProductFormDialogServiceService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.displayedColumns.push('actions');
    this.productService.getAll().subscribe(result => {
      console.log(result);

      this.dataSource = new MatTableDataSource(result);
    })
  }
  refreshTable() {
    this.productService.getAll().subscribe(result => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
    })
  }

  getValue(item: any, columnTemplate: any) {
    return item[columnTemplate];
  }

  isOdd(index: number) {
    return (index % 2) === 0;
  }

  openDialog(title, record): void {
    this.productFormService.loadComponent(title, record).subscribe(result => {
      if (result && result['success']) {
        console.log('success');
      }
    });
  }

  onRowEdited(record, index): void {
    this.productFormService.loadComponent('Editando producto', record).subscribe(result => {
      if (result && result['success']) {
        this.refreshTable();
      }
    });
  }
  onNewRecord(): void {
    this.productFormService.loadComponent('Creando nuevo producto', null).subscribe(result => {
      if (result && result['success']) {
        console.log('success');
      }
    });
  }

  onDeleteRecord(record): void {
    this.productService.delete(record.id).subscribe();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
