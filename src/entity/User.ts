import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Article } from "./Article";
import { Bookmark } from "./Bookmark";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // @Field()
  // @Column()
  // firstName: string;

  // @Field()
  // @Column()
  // lastName: string;

  @Field()
  @Column()
  fullname: string;

  @Field()
  @CreateDateColumn()
  register_date: Date;

  @Field()
  @Column()
  username: string;

  // @Field()
  // name(@Root() parent: User): string {
  //   return `${parent.firstName} ${parent.lastName}`;
  // }

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Article, article => article.user)
  articles: Article[];

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];
}
