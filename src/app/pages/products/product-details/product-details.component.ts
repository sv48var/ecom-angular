import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { URLs } from 'src/app/shared/constants/endPointURLs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  gender!: string; 
  sku!: string; 
  shoes: any;
  loading: boolean = true;
  slickConfig: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.slickConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gender = params.get('gender') || ''; 
      this.sku = params.get('sku') || ''; 
      this.fetchProductDetails();
    });
  }
  
  async fetchProductDetails(): Promise<void> {
    try {
      this.apiService.get(`${URLs.get_products}${this.gender}/${this.sku}/`).subscribe(
        (response: any) => {
          this.shoes = response;
          console.log(response);
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching product details:', error);
          this.loading = false;
        }
      );
    } catch (error) {
      console.error('Error fetching product details:', error);
      this.loading = false;
    }
  }
  

  addToCart(sku: string,): void {
    this.apiService.post(`${URLs.add_to_cart}${sku}`, {})
      .subscribe(
        () => {
        },
        error => {
          console.error('Error adding to cart:', error);
        }
      );
  }
}
