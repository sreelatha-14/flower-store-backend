import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlowersService } from './flowers.service';

@Controller('flowers')
export class FlowersController {
    constructor(private readonly flowersService: FlowersService) {}

    @Get()
    getAllFlowers() {
        return this.flowersService.getAllFlowers();
    }

    @Post()
    createFlower(@Body() body: { name: string; price: number; description?: string }) {
        return this.flowersService.createFlower(body);
    }
}
