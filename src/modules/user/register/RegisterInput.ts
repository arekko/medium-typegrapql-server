import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  // @Field()
  // @Length(1, 255)
  // firstName: string;

  // @Field()
  // @Length(1, 255)
  // lastName: string;

  @Field()
  @Length(1, 255)
  fullname: string;

  @Field()
  @Length(1, 255)
  username: string;

  @Field()
  @IsEmail()
  // @IsEmailAlreadyExist({ message: "Email is already exists" })
  email: string;

  @Field()
  password: string;
}
