import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../service/data/posts-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Post{
  constructor(
    public id: number,
    public username: string,
    public description: string,
    public image?: string // ✅ Use 'image' (not 'imageUrl' or 'imageBase64')
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
        //this.posts = response;
        // this.posts = response.map((post: any) => {
        //   if (post.image) {
        //     post.image = this.convertImage(post.image);
        //   }
        //   return post;
        // });
        this.posts = response.map((post: any) => ({
          ...post,
          imageBase64: post.image ? this.convertImage(post.image) : null // Apply conversion safely
      }));
      },
      error => {
        console.error('Error fetching posts: ', error);
      }
    )
  }

  convertImage(image: any): string {
    if (!image || typeof image === "string") {
        return image; // Return as-is if already Base64
    }
    try {
        return btoa(String.fromCharCode(...new Uint8Array(image)));
    } catch (error) {
        console.error("Error converting image:", error);
        return ""; // Return empty string on error
    }
}

}
