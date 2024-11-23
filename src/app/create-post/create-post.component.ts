import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsDataService } from '../service/data/posts-data.service';
import { Post } from '../posts/posts.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  id!: number;
  post!: Post;  

  constructor(
    private postDataService : PostsDataService,
    private route : ActivatedRoute,
    private router : Router
  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.post = new Post(this.id, "saurabh", "");
    console.log(this.id);
    if(this.id != -1){
      this.postDataService.retrievePost('saurabh', this.id).subscribe(
        data => this.post = data
      )
    }
  }

  onSubmit() {
    console.log('Post Submitted:', this.post);
    // You can add logic to save the post here (e.g., send data to backend).
    if(this.id == -1){
      //create todo
      console.log("in method");
      this.postDataService.createPost('saurabh', this.post).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['dashboard']);
        }
      )
    }else{
      this.postDataService.updatePost('saurabh', this.id, this.post).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['dashboard']);
        }
      )
    }
  }

}
