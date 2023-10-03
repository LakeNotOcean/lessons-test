import { randomUUID } from 'crypto';
import pino from 'pino';
import PinoHttp from 'pino-http';

const oPino = pino;

/**
 * @returns {object}
 */
export function getLoggerService() {
	const env = process.env.NODE_ENV;
	return PinoHttp({
		// Define custom serializers
		// serializers: {
		// 	err: pino.stdSerializers.err,
		// 	req: pino.stdSerializers.req,
		// 	res: pino.stdSerializers.res,
		// },
		// Set to `false` to prevent standard serializers from being wrapped.
		wrapSerializers: true,
		autoLogging: true,

		// Define a custom logger level
		customLogLevel: function (req, res, err) {
			if (res.statusCode >= 400 && res.statusCode < 500) {
				return 'warn';
			} else if (res.statusCode >= 500 || err) {
				return 'error';
			} else if (res.statusCode >= 300 && res.statusCode < 400) {
				return 'silent';
			}
			return 'info';
		},
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: false,
				singleLine: true,
				levelFirst: false,
				translateTime: "yyyy-mm-dd'T'HH:mm:ss.l'Z'",
				messageFormat: '{req.headers.x-correlation-id} [{context}] {msg}',
				ignore:
					'pid,hostname,service,req.headers,req.id,res.headers,res.id,context,req.remotePort,req.remoteAddress',
				errorLikeObjectKeys: ['err', 'error'],
			},
		},

		// Define a custom receive message
		customReceivedMessage: function (req, res) {
			return 'request received: ' + req.method;
		},

		customProps: function () {
			return {
				env: env,
				uuid: randomUUID,
			};
		},
	});
}
