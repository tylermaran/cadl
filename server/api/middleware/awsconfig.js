const aws = require('aws-sdk');

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_ID,
	secretAccessKey: process.env.AWS_SECURITY_KEY,
	region: 'us-east-2',
});

const s3 = new aws.S3();

module.exports = s3;
