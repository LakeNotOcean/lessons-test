import { fnGetConfigSerivce } from '../src/services/config.service.js';

async function fnBootstap() {
	const oConfigService = fnGetConfigSerivce();
}

fnBootstap();
