import { Field, ObjectType, ID } from "type-graphql";
import {
  DocumentType,
  getModelForClass,
  prop,
  pre,
  modelOptions,
} from "@typegoose/typegoose";
import crypto from "crypto";

@pre<User>("save", function () {
  if (this.password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = this.hashPassword(this.password);
  }
})
@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Field(() => ID)
  readonly _id!: string;

  @Field(() => String)
  @prop({ required: true, index: true })
  userName!: string;

  @Field(() => String)
  @prop({ required: true })
  userAddress!: string;

  @Field(() => String)
  @prop({ required: true })
  mobileNo!: string;

  @prop({ required: true })
  password!: string;

  @Field(() => Boolean, { defaultValue: true })
  @prop({ required: true, default: true })
  isActive!: boolean;

  @prop()
  salt!: string;

  hashPassword(this: DocumentType<User>, toBeHash: string) {
    let hash = crypto
      .pbkdf2Sync(
        toBeHash,
        Buffer.from(this.salt, "base64"),
        10000,
        512,
        "sha512"
      )
      .toString("base64");
    return hash;
  }
}

const Users = getModelForClass(User);
export default Users;
