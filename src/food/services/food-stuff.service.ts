import { HttpException, Injectable } from '@nestjs/common';
import { CreateFoodStuffDto } from '../dto/create-food-stuff.dto';
import { FoodStuffDocument, FoodStuffModel, FoodStuffType } from '../models/food-stuff.model';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const foodStuffs = [
    {
        id: '68db35f4-68c8-49d9-b50b-30c646090755',
        name: 'Chicken breast',
        description: 'Diet food',
        type: FoodStuffType.MEAT,
        calories: 165,
        proteins: 31.0,
        fats: 3.6,
        carbohydrates: 0,
    },
    {
        id: '1cbb9bb8-23ba-424e-8e8d-c5bb779cc5fe',
        name: 'Tomato',
        description: 'Vegetables',
        type: FoodStuffType.VEGETABLE,
        calories: 18,
        proteins: 0.88,
        fats: 0.20,
        carbohydrates: 3.89,
    },
];

@Injectable()
export class FoodStuffService {
    constructor(
        @InjectModel(FoodStuffModel.name) private foodStuffModel: Model<FoodStuffDocument>
    ) {}
    
    async create(createDto: CreateFoodStuffDto): Promise<FoodStuffModel> {
        const entity = new this.foodStuffModel(createDto);
        entity.id = entity._id.toString();

        return entity.save();
    }

    async findOne(id: string): Promise<FoodStuffModel | never> {
        for (const foodStuff of foodStuffs) {
            if (foodStuff.id === id) return foodStuff;
        };

        throw new HttpException('Food stuff not found', 404);
    }

    async findAll(
        skip: number = 0,
        take: number = 100
    ): Promise<FoodStuffModel[]> {
        return this.foodStuffModel.find();
    }
}