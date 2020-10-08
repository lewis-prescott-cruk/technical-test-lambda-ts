import sinon from 'sinon';
import handler from '../handler';
import localService from '../localeService';

describe('lambda handler', () => {
  let localeStub;

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

    it('english', async () => {
      let event = { headers: { locale: "es" } };
      let context = {};

      let response = await handler(event, context);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(`{"message":"Hello!"}`);
    });
  });

  describe('locale', () => {
    it.skip('missing header', async () => {
    });
  });
});
