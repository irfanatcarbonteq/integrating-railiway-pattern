
import BaseEntity from "../BaseEntity";
class PostEntity extends BaseEntity {
   public postId: string;               
    public createdAt: Date;               
    public updatedAt: Date;               
    public title: string;               
    public content: string;               
    public authorId: string;       
 
   constructor(postId: string, createdAt: Date, updatedAt: Date, title: string, content: string, authorId: string) {
     super();   
     this.postId = postId;   
     this.createdAt = createdAt;   
     this.updatedAt = updatedAt;   
     this.title = title;   
     this.content = content;   
     this.authorId = authorId;   
   }
   
   static create(obj): PostEntity {
     const post  = new PostEntity(obj.postId, obj.createdAt, obj.updatedAt, obj.title, obj.content, obj.authorId);
     if (obj.createdAt && obj.updatedAt) {
       post.setDates(obj.createdAt, obj.updatedAt);
     }
     return post; 
   }

}
export default PostEntity;