import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.css']
})
export class ProductFormDialogComponent implements OnInit {
  title;
  record;
  form: FormGroup;
  imagen: string;
  constructor(
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
    this.record = this.data.record;
    console.log(this.record);

    this.form = new FormGroup({
      name: new FormControl({
        value: (this.record && this.record['name'] ? this.record['name'] : ''),
        disabled: false,
      }, [Validators.required]),
      description: new FormControl({
        value: (this.record && this.record['description'] ? this.record['description'] : ''),
        disabled: false,
      }, [Validators.required]),
      precio: new FormControl({
        value: (this.record && this.record['precio'] ? this.record['precio'] : ''),
        disabled: false,
      }, [Validators.required]),
      descuento: new FormControl({
        value: (this.record && this.record['descuento'] ? this.record['descuento'] : ''),
        disabled: false,
      }, [Validators.required]),
      image: new FormControl({
        value: (this.record && this.record['image'] ? this.record['image'] : ''),
        disabled: false,
      }, [Validators.required]),
    });
    if(this.record && this.record['image'] ){
      this.imagen = this.record['image'];
    }
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close({});
  }
  ok(){
    this.form.value.status = 'AC';
    let id =0;
    if(this.record?.id){
      id = this.record?.id;
    }
    this.productService.save(id, this.form.value).subscribe(result =>
      console.log(result));
    this.dialogRef.close();
  }

  extraerBase64 =async ($event :any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob:$event,
          image,
          base: reader.result
        })
      };
      reader.onerror = error => {
        resolve({
          blob:$event,
          image,
          base: null
        });
      }
    } catch(e) {
      return null;
    }
  })

  captureFile(event) :any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then(image => {
      console.log(image);
      this.imagen = image['base'];
      this.form.value['image'] = image['base'];
    })
  }
}
