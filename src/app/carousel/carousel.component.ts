import { Component, Input } from '@angular/core';

interface CarouselImages {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
[x: string]: any;
  @Input() images: CarouselImages[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 2600 //default 2.6 secs
  selectedIndex = 0;

  ngOnInit(): void{
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

  //Changes slide in every 3 secs
  autoSlideImages(): void{
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval)
  }

  //sets index of image on dot/indicator click
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  // onPrevClick(): void{
  //   if(this.selectedIndex === 0) {
  //     this.selectedIndex = this.images.length - 1;
  //   } else {
  //     this.selectedIndex--;
  //   }
  // }

   onNextClick(): void{
     if(this.selectedIndex === this.images.length - 1) {
       this.selectedIndex = 0;
     } else{
       this.selectedIndex++;
     }
   }



}


