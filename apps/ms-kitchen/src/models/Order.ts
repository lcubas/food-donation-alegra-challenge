import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum OrderStateEnum {
  CREATED = 'created',
  INGREDIENTS_REQUESTED = 'ingredient_requested',
  PREPARING = 'preparing',
  COMPLETED = 'completed',
}

// TODO: Use uuid as id instead of mongoose's default objectId
@Schema({ versionKey: false })
export class Order extends Document {
  @Prop({
    type: String,
    required: true,
    enum: OrderStateEnum,
  })
  status: OrderStateEnum;

  @Prop({ required: true })
  recipeId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: null })
  completedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
