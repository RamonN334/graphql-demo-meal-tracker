import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose/dist';
import mongoose, { HydratedDocument } from 'mongoose';

export enum FoodStuffType {
    MEAT = 'Meat',
    FRUIT = 'Fruit',
    VEGETABLE = 'Vegetable'
}

export type FoodStuffDocument = HydratedDocument<FoodStuffModel>;

@ObjectType()
@Schema({ collection: 'food_stuffs'})
export class FoodStuffModel {
    @Field()
    @Prop({
        type: String,
        index: true,
        unique: true,
        required: true,
    })
    id: string;

    @Field()
    @Prop({ lowercase: true, maxlength: 200, required: false, unique: true, })
    name: string;

    @Field({ nullable: true })
    @Prop({ maxlength: 1000, required: false })
    description: string;

    @Field(type => String)
    @Prop({ enum: FoodStuffType })
    type: FoodStuffType;

    @Field()
    @Prop()
    calories: number

    @Field()
    @Prop()
    proteins: number;

    @Field()
    @Prop()
    fats: number;

    @Field()
    @Prop()
    carbohydrates: number;
}

export const FoodStuffSchema = SchemaFactory.createForClass(FoodStuffModel);