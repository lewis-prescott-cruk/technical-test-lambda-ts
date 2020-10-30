import localeService from './localeService';

export const handler = async (event: { headers: any; }, context: {}) => {

  const locale = event.headers && event.headers['locale'] ? event.headers['locale'] : undefined;

  if (!locale) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No locale header given',
      }),
    };

    return response;
  }

  const localeGreeting = await localeService.getLocalGreeting(event.headers['locale']);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: localeGreeting,
    }),
  };

  return response;
};

export default handler;
