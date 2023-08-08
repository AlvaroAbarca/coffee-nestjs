import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { IsEmail } from 'class-validator';

import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({
    required: [true, 'cant be blank'],
    match: [/^[a-zA-Z]+$/, 'is invalid'],
  })
  first_name: string;

  @Prop({
    required: [true, 'cant be blank'],
    match: [/^[a-zA-Z]+$/, 'is invalid'],
  })
  last_name: string;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Prop({ required: [true, 'PASSWORD_IS_BLANK'] })
  password: string;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(
  //     this.password,
  //     Number(process.env.HASH_SALT),
  //   );
  // }
}
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export { UserSchema };
