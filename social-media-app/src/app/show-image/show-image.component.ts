import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageserviceService } from '../services/imageservice.service';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  image;
  comments;
  uploader;
  url;
  imageId;
  newComment;

  constructor(private imageserviceService :ImageserviceService, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.imageId = params.get('id');
      console.log("Hola")
      this.fetchData();
    });
    this.fetchData();
  }
  submitForm() {
    const formData = {
      imageid: this.imageId,
      body: this.newComment
    };
    console.log("Form");
    console.log(formData);
    this.imageserviceService.postCommentInImage(formData)
    .subscribe((response) => {
      console.log("Success creating a new comment")
    },
    error => {
      console.log("Error creating a new comment "+error);
    })
  }
  fetchData(){
    this.imageserviceService.getImageUrlsAndCommentsByPictureId(this.imageId)
    .subscribe((response) => {
      this.comments = response.image_comments;
      this.image = response;
      this.uploader = response.user
      console.log(response);
      this.fetchImage(this.image);
    },
    error => {
      console.log("Error while fetch the data for show the image "+error);
    })
  }
  fetchImage(imageData){
    this.imageserviceService.getImageById(imageData.id)
    .subscribe((photoBlob) => {
      const photoUrl = URL.createObjectURL(photoBlob);
      this.image.blob = this.sanitizer.bypassSecurityTrustUrl(photoUrl);
    },
    error => {
      console.log("Error fetching the blob of the picture "+error);
    })
  }

}
