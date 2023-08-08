import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @Prop({
    required: [true, 'cant be blank'],
    match: [/^[a-zA-Z]+$/, 'is invalid'],
  })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
