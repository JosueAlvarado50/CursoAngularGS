import { Component ,OnInit } from '@angular/core';
import { IProduct } from './product';  
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List!';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  
  public get listFilter() : string {
    return this._listFilter;
  }

  public set listFilter(v : string) {
    this._listFilter = v;
    console.log('In Setter:', v);
    this.filteredProducts = this.performFilter(v);//TODO filtra con el valor agregado como parametro
  }

  filteredProducts: IProduct[] = [];//TODO: es para guardar en otra lista los productos filtrados y no perder los productos originales
  
  products: IProduct[] = [];

  //TODO: se utiliza un parametro de constructor para definir la dependencia(la clase.servicio que importamos)
  constructor(private productService: ProductService) {

  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct)=>
    product.productName.toLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
      console.log('In OnInit');
      this.products = this.productService.getProducts();
      this.filteredProducts = this.products;
      //this.listFilter = 'cart';
  }
  //TODO: cambia el titulo de la pagina con el parametro de mensaje, al presionar las estrellas de rating del producto
  onRatingClicled(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

}
