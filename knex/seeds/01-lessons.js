/**
 * @param oKnex
 * @returns { Promise<void> }
 */
export async function seed(oKnex) {
	// Deletes ALL existing entries
	await oKnex.schema.createSchemaIfNotExists('lessons');
	const schema = oKnex.schema.withSchema('lessons');
	if (!(await schema.hasTable('lessons'))) {
		await schema.createTableIfNotExists('lessons', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.datetime('date');
			table.string('description', 200).notNullable();
			table.boolean('status').defaultTo(false);
		});
	}
	if (!(await schema.hasTable('teachers'))) {
		await schema.createTableIfNotExists('teachers', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.string('name', 200).notNullable();
		});
	}

	if (!(await schema.hasTable('students'))) {
		await schema.createTableIfNotExists('students', (table) => {
			table.uuid('id').primary().defaultTo(oKnex.raw('uuid_generate_v4()'));
			table.string('name', 200).notNullable();
		});
	}
	if (!(await schema.hasTable('lesson_teachers'))) {
		await schema.createTableIfNotExists('lesson_teachers', (table) => {
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
	}
	if (!(await schema.hasTable('lessons_students'))) {
		schema.createTableIfNotExists('lesson_students', (table) => {
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
}
