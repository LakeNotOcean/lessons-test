import { setDatetimeParams } from '#src/utils/datetime.utils.js';

export const getLessons = (oKnexConnection, oParams) => {
	const paggingParams = oParams.paggingParams;
	const oSubquery = oKnexConnection;
	const oQuery = oKnexConnection
		.select()
		.from({ l: 'lessons' })
		.leftJoin({ lt: 'lesson_teachers' }, 'l.id', '=', 'lt.lesson_id')
		.leftJoin({ t: 'teachers' }, 'lt.teacher_id', '=', 't.id')
		.leftJoin({ ls: 'lesson_students' }, 'l.id', '=', 'ls.lesson_id')
		.leftJoin({ s: 'student' }, 's.student', 'ls.student_id', 's.id')
		.leftJoin({}, '', '')
		.where((oBuilder) => {
			setDatetimeParams(oBuilder, oParams.oDateStart, oParams.oDateEnd);
			oBuilder.where({ ...(oParams.status && { status: oParams.status }) });
			if (oParams.teacherIds) {
				oBuilder.whereIn('teacher_id', oParams.teacherIds);
			}
			if (oParams.studentsCount) {
				return;
			}
		});
};
