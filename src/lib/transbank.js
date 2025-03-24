import { WebpayPlus } from 'transbank-sdk';

// Configurar para el ambiente de pruebas
WebpayPlus.configureForTesting();

// Para producción, usa:
// WebpayPlus.configureForProduction('tu_codigo_de_comercio', 'tu_api_key_secret');

// Creamos instancias de Transaction
const createTransaction = new WebpayPlus.Transaction();
const commitTransaction = new WebpayPlus.Transaction();

export { createTransaction, commitTransaction };