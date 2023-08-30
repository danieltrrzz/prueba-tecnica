import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UntypedFormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  form: FormGroup = Object.create(null);
  id: string | number = 0;

  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private productService: ProductService,
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildFormControl();
  }

  /**
   * Construir formularios reactivos
   */
  private buildFormControl(): void {
    // Login
    this.form = this.formBuilder.group({
      id: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [null, [Validators.required]],
      date_release: [null, [Validators.required]],
      date_revision: [{ value: null, disabled: true }, [Validators.required]],
    });

    this.dateRelease.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value: any) => {
        if (value) {
          const dateRelease = moment(value)
          const now = moment();
          if(dateRelease >= now){
            // Agrego un año a la fecha de revision
            this.dateRevision.patchValue(dateRelease.add(1, 'y').format('YYYY-MM-DD'));
          }else{
            this.dateRelease.patchValue(null, { emitEvent: false });
            this.dateRevision.patchValue(null, { emitEvent: false })
            return alert('La fecha de liberación no puede ser menor que el dia actual');
          };
        };
      });
  }

  ngOnInit(): void {
    // Id del producto
    this.id = this.route.snapshot.paramMap.get('id') || 0;
    if(this.id){
      this.form.controls['id'].disable();
      this.laodForm();
    };
  }

  get dateRelease(): FormControl {
    return this.form.controls['date_release'] as FormControl
  };

  get dateRevision(): FormControl {
    return this.form.controls['date_revision'] as FormControl
  };

  /**
   * Cargar datos del formulario
   */
  laodForm(): void {
    this.productService.findOne(this.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result.length == 0) {
          alert('El producto no existe');
          this.router.navigate(['products/product-list']);
          return;
        };
        // Mapear datos
        let body: IProduct = JSON.parse(localStorage.getItem('product') || '{}') as any;
        body.date_release = moment(body.date_release).format('YYYY-MM-DD');
        body.date_revision = moment(body.date_revision).format('YYYY-MM-DD');
        this.form.patchValue(body, { emitEvent: false });
      })
  }

  /**
   * Guardar
   * @returns
   */
  onSubmit(): void {
    // Validar formulario
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, llene todos los datos del formulario');
      return;
    };
    const body = this.form.getRawValue();
    const action = this.id? 'update': 'create';

    this.productService[action](body)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        if (result.length == 0) return alert('Error al guardar el producto');
        alert(this.id? 'Producto actualizado': 'Producto creado');
        this.id = body.id;
        this.form.controls['id'].disable();
      });
  }

  /**
   * Formatear formualrio
   */
  resetForm(): void{
    localStorage.clear();
    this.id = 0;
    this.form.reset();
    this.form.controls['id'].enable();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
