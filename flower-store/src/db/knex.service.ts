import { Injectable, OnModuleInit } from '@nestjs/common';
import knex from 'knex';
import { Model } from 'objection';
import * as config from '../../knexfile'

@Injectable()
export class KnexService implements OnModuleInit {
    private knexInstance = knex(config.development)
    
    getKnex() {
    return this.knexInstance;
    }

    onModuleInit() {
        Model.knex(this.knexInstance);
        console.log('[Knex] Objection bound to knex instance');
    }
}
