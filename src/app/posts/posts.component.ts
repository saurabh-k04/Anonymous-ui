import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../service/data/posts-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Post{
  constructor(
    public id: number,
    public username: string,
    public description: string
  ){

  }
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] | any;
  message: string = '';
  username!: string | null;

  constructor(
    private postDataService: PostsDataService,
    private basicAuthenticationService : BasicAuthenticationService,
    private router : Router
  ) {}

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
}
