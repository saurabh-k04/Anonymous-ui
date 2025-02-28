import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/posts/posts.component';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostsDataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  retrieveAllPosts(username: any){
    // return this.http.get<Post[]>(this.apiUrl + `/users/${username}/posts`);
    //console.log("Hello world Bean service")
    return this.http.get<Post[]>(this.apiUrl + `/posts`);
  }

  retrievePost(username: any, id: any){
    console.log("check");
    return this.http.get<Post>(this.apiUrl + `/users/${username}/posts/${id}`);
    //console.log("Hello world Bean service")
  }

  updatePost(username: any, id: any, post: any){
    return this.http.put(this.apiUrl + `/users/${username}/posts/${id}`, post);
    //console.log("Hello world Bean service")
  }

  // createPost(username: any, post: any){
  //   console.log("in");
  //   return this.http.post(this.apiUrl + `/users/${username}/posts`, post);
  //   //console.log("Hello world Bean service")
  // }

  createPost(username: string, post: any, file: File | null) {
    const formData = new FormData();

    // Remove 'username' from post before sending
    const { username: _, ...postWithoutUsername } = post;

    // Convert JSON object to Blob and append it as 'post'
    formData.append("post", new Blob([JSON.stringify(postWithoutUsername)], { type: "application/json" }));

    // Append image file if available
    if (file) {
        formData.append("image", file);
    }

    return this.http.post(`${this.apiUrl}/users/${username}/posts`, formData);
  }
}
