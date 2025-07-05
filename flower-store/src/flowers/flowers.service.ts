import { Injectable } from '@nestjs/common';
import { Flower } from './flower.model';

@Injectable()
export class FlowersService {
    async getAllFlowers() {
        return Flower.query();
    }

    async createFlower(data: { name: string; price: number; description?: string }) {
        return Flower.query().insert(data);
    }
}
