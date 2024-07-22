import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.services';
import { URLs } from 'src/app/shared/constants/endPointURLs';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  gender: string | null = null;
  shoes: any[] = [];
  loading = true;
  sortOrder = 'desc';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gender = params.get('gender');
      this.fetchShoes();
    });
  }

  fetchShoes(): void {

    this.apiService.get(`${URLs.get_products}${this.gender}/`)
      .subscribe(
        response => {
          this.shoes = response.shoes;
          this.loading = false;
        },
        error => {
          console.error('Error fetching shoes:', error);
          this.loading = false;
        }
      );
  }

addToCart(sku: string, event: Event): void {
  this.apiService.post(`${URLs.add_to_cart}${sku}`, {})
    .subscribe(
      () => {
      },
      error => {
        console.error('Error adding to cart:', error);
      }
    );
}


  handleSortChange(event: any): void {
    this.sortOrder = event.target.value;
  }

  sortShoes(shoes: any): any[] {
    if (Array.isArray(shoes)) {
      return shoes.slice().sort((a: any, b: any) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (this.sortOrder === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
    } else if (typeof shoes === 'object') {
      const productsArray = Object.values(shoes);

      return productsArray.slice().sort((a: any, b: any) => {
        const priceA = parseFloat(a.buyPrice);
        const priceB = parseFloat(b.buyPrice);

        if (this.sortOrder === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
    } else {
      return [shoes]; 
    }
  }
}
