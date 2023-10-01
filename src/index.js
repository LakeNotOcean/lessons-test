import bodyParser from 'body-parser';
import express from 'express';
import { fnExceptionHandler } from './lib/exceptions/exception.filter.js';
import { fnGetConfigSerivce } from './services/common/config/config.service.js';

function fnBootstap() {
	const oConfigService = fnGetConfigSerivce();
	const sPort = oConfigService.fnGetOrThrow('appPort');
	const sAddress = oConfigService.fnGetOrThrow('appAddress');
	const oApp = express();
	oApp.use(bodyParser.json());
	oApp.use(
		bodyParser.urlencoded({
			extended: true,
		}),
	);
	oApp.use(fnExceptionHandler);
	oApp.listen(sPort, sAddress, () => {
		console.log('App listening on port ' + sPort);
	});
}

fnBootstap();
