/////////////////////////////////////////////////////////
// routes/api/index.js                M Jordan
/////////////////////////////////////////////////////////
require("dotenv").config();
const router = require("express").Router();
const goalsRoutes = require("./goals");
const connect = require("./connect");
const aws = require("aws-sdk");

const S3_BUCKET = process.env.S3_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

aws.config.region = "us-east-2";

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});


// goals routes
router.use("/goals", goalsRoutes);

router.get("/sign-s3", function(req,res) {

    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data, 
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

module.exports = router;
