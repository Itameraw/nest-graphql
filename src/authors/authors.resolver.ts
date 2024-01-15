import { Args,Mutation,Parent,Query,ResolveField,Resolver } from "@nestjs/graphql";
import { Post } from "src/posts/entities/post.entity";
import { Author } from "./entities/author.entity";
 import { AuthorsService } from "./authors.service";

 @Resolver(()=> Author)
 export class AuthorsResolver {
  constructor(private readonly authorService: AuthorsService){}
  @Query(()=> [Author])
  authors(){
    console.log("Author")
    return this.authorService.findAll();
  }
  @Mutation(()=> Author)
  createAuthor(@Args('name') name: string){
    return this.authorService.create(name);
  }
  @ResolveField(()=>[Post])
  posts(@Parent() author: Author){
    return this.authorService.authorPosts(author.id)
  }
  @ResolveField(()=>[String])
  coments(@Parent() author: Author){
    console.log("coments")
    return ["coment 1", "coment 2"]
  }
 }