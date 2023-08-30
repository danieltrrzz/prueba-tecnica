import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: IProduct[] = [];

  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private productService: ProductService,
    private router: Router,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.productService.findAll()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: IProduct[]) => {
        if (result.length == 0) return;
        // Control para mostrar las acciones
        result.forEach(product => product.actions = false)
        this.products = result;
      });
  }

  /**
   * Crear o eliminar producto
   * @param id
   */
  createOrEditProduct(product?: IProduct): void {
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigate([product ? `products/product/${product.id}` : 'products/product']);
  }

  /**
   * Eliminar producto
   * @param id
   */
  removeProduct(id: string): void {
    this.productService.remove(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if(result){
          alert('Producto eliminado correctamente');
          this.products = this.products.filter(product => product.id != id);
          this.cdRef.detectChanges();
        };
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
