import { Component, OnInit } from '@angular/core';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  message = '';

  fileInfos: Observable<any>;

  constructor(private uploadImageService: UploadImageService) { }

  ngOnInit() {

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {

    this.currentFile = this.selectedFiles.item(0);
    this.uploadImageService.upload(this.currentFile).subscribe(
      event => {
        if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadImageService.getFiles();
        }
      },
      err => {
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}
