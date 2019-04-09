import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@ObjectType()
@Entity("bookmarks")
export class Bookmark extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  bid: number;

  @Field()
  @CreateDateColumn()
  creation_date: Date;

  @Column() user_id: number;

  @ManyToOne(() => User, user => user.bookmarks)
  user: User;

  @Column() article_id: number;

  @ManyToOne(() => Article, article => article.bookmarks)
  article: Article;

  @Field(() => Article)
  bmarticle: Article;
}
