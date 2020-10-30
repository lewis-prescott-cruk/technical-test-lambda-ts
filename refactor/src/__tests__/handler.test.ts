import sinon from 'sinon';
import handler from '../handler';
import localService from '../localeService';

describe('lambda handler', () => {
  let localeStub: any;

  afterEach(() => {
    localeStub.restore();
  });

  describe('language greeting', () => {
    const locale = "en";

    beforeEach(() => {
      localeStub = sinon.stub(localService, "getLocalGreeting");
      localeStub.callsFake((language) => {
        expect(language).toEqual(locale)
        return Promise.resolve("Hello!");
      });
    });

    it('Hola response', async () => {
      let event = { headers: { locale: "es" } };
      let context = {};
      try {
        let response = await handler(event, context);

        if (response.statusCode != 200) {
          throw new Error("Unexpected status code");
        }

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(`{"message":"¡Hola!"}`);
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe('locale', () => {
    it.skip('missing header', async () => {
    });
  });
});
