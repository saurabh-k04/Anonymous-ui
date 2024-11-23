import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsDataService } from '../service/data/posts-data.service';
import { Post } from '../posts/posts.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  posts: Post[] | any
  message: string = ''

  constructor(private postDataService: PostsDataService,
    private router : Router) {

  }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos(){
    this.postDataService.retrieveAllPosts('saurabh').subscribe(
      response =>{
        //console.log(response);
        this.posts = response;
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
