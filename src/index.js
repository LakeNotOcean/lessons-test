import bodyParser from 'body-parser';
import express from 'express';
import { fnExceptionHandler } from './lib/exceptions/exception.filter.js';
import { fnGetConfigSerivce } from './services/common/config/config.service.js';
import { fnGetDbService } from './services/common/db/db.service.js';
import { getLoggerService } from './services/common/logger/logger.service.js';

/**
 *
 */
async function fnBootstap() {
	const oConfigService = fnGetConfigSerivce();
	const oLoggerService = getLoggerService();

	const oDbService = await fnGetDbService(
		oConfigService,
		oLoggerService.logger,
	);

	const sPort = oConfigService.fnGetOrThrow('appPort');
	const sAddress = oConfigService.fnGetOrThrow('appAddress');
	const oApp = express();

	oApp.use(oLoggerService);
	oApp.use(bodyParser.json());
	oApp.use(
		bodyParser.urlencoded({
			extended: true,
		}),
	);
	oApp.use(fnExceptionHandler);
	oApp.listen(parseInt(sPort), sAddress, () => {
		oLoggerService.logger.info('App listening on port ' + sPort);
	});
}

fnBootstap();
