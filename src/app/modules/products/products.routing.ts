import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component'

export const ProductsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'product/:id',
        component: ProductComponent
      },
      {
        path: 'product-list',
        component: ProductListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ProductsRoutes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
