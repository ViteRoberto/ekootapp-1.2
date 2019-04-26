import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import * as watermark from 'watermarkjs';

@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.scss']
})
export class RetoComponent implements OnInit {

  @ViewChild('previewImage') waterMarkImage: ElementRef;

  originalImage = null;
  blobImage = null;

  constructor(public camara: Camera) { 
   }

  async funcionCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
      // sourceType: this.camara.PictureSourceType.PHOTOLIBRARY
    }
    this.camara.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.originalImage = 'data:image/jpeg;base64,' + imageData;   
      
      fetch(this.originalImage)
        .then(res => res.blob())
        .then(blob => {
          this.blobImage = blob;
        });
    }, (err) => {
      // Handle error
     });
  }  

  async addImageWaterMark(){
    watermark([this.blobImage, '../../../assets/img/watermark.png'])
      .image(watermark.image.lowerRight(0.6))
      .then(img => {
        this.waterMarkImage.nativeElement.src = img.src;
      });
  }

  // async funcionCamara(){
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camara.DestinationType.FILE_URI,
  //     encodingType: this.camara.EncodingType.JPEG,
  //     mediaType: this.camara.MediaType.PICTURE
  //   }
  //   this.camara.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;      
  //   }, (err) => {
  //     // Handle error
  //    });
  // }  

  ngOnInit() {
  }

}
