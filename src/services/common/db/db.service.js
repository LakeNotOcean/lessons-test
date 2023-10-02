import { isDev } from '#src/utils/env.util.js';
import { fnGetDirName } from '#src/utils/path.util.js';
import knex from 'knex';
import { join } from 'path';
/**
 * @param {object} oConfigService
 * @returns {Promise<knex>}
 */
export async function fnGetDbService(oConfigService) {
	const oKnexConnection = knex({
		client: 'pg',
		connection: {
			host: oConfigService.fnGetOrThrow('postgresHost'),
			port: parseInt(oConfigService.fnGetOrThrow('postgresPort')),
			user: oConfigService.fnGetOrThrow('postgresUsername'),
			password: oConfigService.fnGetOrThrow('postgresPassword'),
			database: oConfigService.fnGetOrThrow('postgresDatabase'),
			pool: parseInt(oConfigService.fnGetOrThrow('postgresClientPool')),
		},
		seeds: {
			directory: join(
				fnGetDirName(import.meta.url),
				'..',
				'..',
				'..',
				'..',
				'knex',
				'seeds',
			),
		},
		migrations: {
			directory: join(
				fnGetDirName(import.meta.url),
				'..',
				'..',
				'..',
				'..',
				'knex',
				'migrations_scripts',
			),
		},
	});
	await oKnexConnection.raw('select 1+1 as result');
	if (isDev) {
		await oKnexConnection.migrate.latest();
		await oKnexConnection.seed.run({ recursive: true });
	}
	return oKnexConnection;
}
