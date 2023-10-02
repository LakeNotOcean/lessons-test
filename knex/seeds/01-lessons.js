/**
 * @param oKnex
 * @returns { Promise<void> }
 */
export async function seed(oKnex) {
	// Deletes ALL existing entries
	await oKnex.schema.createSchemaIfNotExists('lessons');
	await oKnex.schema
		.withSchema('lessons')
		.createTableIfNotExists('lessons', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.datetime('date');
			table.string('description', 200).notNullable();
			table.boolean('status').defaultTo(false);
		});
	await oKnex.schema
		.withSchema('lessons')
		.createTableIfNotExists('teachers', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.string('name', 200).notNullable();
		});
	await oKnex.schema
		.withSchema('lessons')
		.createTableIfNotExists('students', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.string('name', 200).notNullable();
		});
	await oKnex.schema
		.withSchema('lessons')
		.createTableIfNotExists('lesson_teachers', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.uuid('lesson_id');
			table.uuid('teacher_id');
			table
				.foreign('lesson_id')
				.references('id')
				.inTable('lessons.lessons')
				.onDelete('cascade');
			table
				.foreign('teacher_id')
				.references('id')
				.inTable('lessons.teachers')
				.onDelete('cascade');
		});
	await oKnex.schema
		.withSchema('lessons')
		.createTableIfNotExists('lesson_students', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.uuid('lesson_id').notNullable();
			table.uuid('student_id').notNullable();
			table
				.foreign('lesson_id')
				.references('id')
				.inTable('lessons.lessons')
				.onDelete('cascade');
			table
				.foreign('student_id')
				.references('id')
				.inTable('lessons.students')
				.onDelete('cascade');
			table.boolean('visit').defaultTo(false);
		});
}
