import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsDataService } from '../service/data/posts-data.service';
import { Post } from '../posts/posts.component';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  posts: Post[] | any;
  message: string = '';
  username!: string | null;

  constructor(private postDataService: PostsDataService,
    private basicAuthenticationService : BasicAuthenticationService,
    private router : Router) {

  }

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();

    if(!this.username) {
      console.log('No authenticated user found, Redirecting to login page.');
      this.router.navigate(['login']);
      return;
    }
    this.refreshPosts();
  }

  refreshPosts(){
    if(!this.username) return;

    this.postDataService.retrieveAllPosts(this.username).subscribe(
      response =>{
        //console.log(response);
        this.posts = response;
      },
      error => {
        console.error('Error fetching posts: ', error);
      }
    )
  }

  updatePost(id: any){
    console.log(`update post ${id}`)
    this.router.navigate(['posts', id]);
  }

  addPost(){
    this.router.navigate(['create-post', -1]);
  }
}
