import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: 'product', component: ProductComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'user', component: HeaderBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
