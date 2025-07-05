/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
   await knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
    })

    .createTable('flowers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.float('price').notNullable();
      table.string('image_url');
    })

    .createTable('cart_items', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('flower_id').references('id').inTable('flowers').onDelete('CASCADE');
      table.integer('quantity').defaultTo(1);
    })

    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.float('total').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE');
      table.integer('flower_id').references('id').inTable('flowers');
      table.integer('quantity').notNullable();
      table.float('price').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('cart_items')
    .dropTableIfExists('flowers')
    .dropTableIfExists('users');
};
