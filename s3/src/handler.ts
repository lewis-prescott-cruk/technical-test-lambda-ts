import AWS from 'aws-sdk';

const getParameter = async (bucketName: string) => {
  const ssm = new AWS.SSM();
  const params = {
    Name: bucketName,
    WithDecryption: false
  }
  const data = ssm.getParameter(params, (err, data) => {
    if (err) return;
    else return data;
  });
  return await data.promise();
}

const getS3BucketKey = async (bucketName: string) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucketName, 
    MaxKeys: 1
   };
   const data = s3.listObjects(params, (err, data) => {
     if (err) return;
     else return data;
   });
   return await data.promise();
}

export const bucketExists = async (event: any) => {
  const param = await getParameter(event.bucketName);

  const bucket = await getS3BucketKey(param.Parameter.Value);

  let response = {
    statusCode: 0,
    body: {
      message: bucket.Contents[0].Key,
    },
  };

  if(bucket == null) {
    response.statusCode = 404;
  } else {
    response.statusCode = 200;
  }

  return response;
};

export default bucketExists;
