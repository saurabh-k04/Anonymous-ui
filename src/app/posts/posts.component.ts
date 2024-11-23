import { Component, OnInit } from '@angular/core';
import { PostsDataService } from '../service/data/posts-data.service';
import { Router } from '@angular/router';

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

  constructor(
    private postDataService: PostsDataService,
    private router : Router
  ) {}

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




}
