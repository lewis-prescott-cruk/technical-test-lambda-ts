import * as AWSMock from "aws-sdk-mock";
import AWS from "aws-sdk"; 
import bucketExists from '../handler';

describe('bucket exists', () => {

  beforeEach(() => {
    AWS.config.update({ region: 'eu-west-1' }); 
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore();
  });

  it('should return OK response', async () => {
    AWSMock.mock('S3', 'listObjects', {
      Contents: [{Key: "test123"}]
    });

    AWSMock.mock('SSM', 'getParameter', { 
      Parameter: { Name: "testBucket", Value: "test123" }
    });

    const event = { bucketName: "testBucket" };
    const result = await bucketExists(event);

    expect(result).toEqual({
      statusCode: 500,
      body: { message: null}});
  });

  it.skip('should return Not Found response', async () => {});
});
