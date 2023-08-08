import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { IsEmail } from 'class-validator';

import { Product } from './products.schema';

export type StockDocument = HydratedDocument<Stock>;

@Schema({ versionKey: false, timestamps: true })
export class Stock {
  @Prop({
    required: [true, 'cant be blank'],
    enum: ['in', 'out'],
  })
  movement: string;

  @Prop({
    required: [true, 'cant be blank'],
    match: [/^[a-zA-Z]+$/, 'is invalid'],
  })
  description: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
