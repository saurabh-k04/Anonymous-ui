import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/posts/posts.component';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService {

  constructor(private http: HttpClient) { }

  retrieveAllPosts(username: any){
    return this.http.get<Post[]>(`http://localhost:8080/users/${username}/posts`);
    //console.log("Hello world Bean service")
  }

  retrievePost(username: any, id: any){
    console.log("check");
    return this.http.get<Post>(`http://localhost:8080/users/${username}/posts/${id}`);
    //console.log("Hello world Bean service")
  }

  updatePost(username: any, id: any, post: any){
    return this.http.put(`http://localhost:8080/users/${username}/posts/${id}`, post);
    //console.log("Hello world Bean service")
  }

  createPost(username: any, post: any){
    console.log("in");
    return this.http.post(`http://localhost:8080/users/${username}/posts`, post);
    //console.log("Hello world Bean service")
  }
}
