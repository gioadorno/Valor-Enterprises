/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_APPLICATIONS_ARN
	STORAGE_APPLICATIONS_NAME
	STORAGE_APPLICATIONS_STREAMARN
	STORAGE_CAREERS_ARN
	STORAGE_CAREERS_NAME
	STORAGE_CAREERS_STREAMARN
	STORAGE_DISPOEMPLOYEES_ARN
	STORAGE_DISPOEMPLOYEES_NAME
	STORAGE_DISPOEMPLOYEES_STREAMARN
	STORAGE_DISPOSITIONS_ARN
	STORAGE_DISPOSITIONS_NAME
	STORAGE_DISPOSITIONS_STREAMARN
	STORAGE_EMPLOYEES_ARN
	STORAGE_EMPLOYEES_NAME
	STORAGE_EMPLOYEES_STREAMARN
	STORAGE_EVENTS_ARN
	STORAGE_EVENTS_NAME
	STORAGE_EVENTS_STREAMARN
	STORAGE_INVENTORY_ARN
	STORAGE_INVENTORY_NAME
	STORAGE_INVENTORY_STREAMARN
	STORAGE_PAYOUTS_ARN
	STORAGE_PAYOUTS_NAME
	STORAGE_PAYOUTS_STREAMARN
	STORAGE_VALORANTSTORAGE_BUCKETNAME
	STORAGE_VSTORAGE_ARN
	STORAGE_VSTORAGE_NAME
	STORAGE_VSTORAGE_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()

});
const client = require('@sendgrid/client');
client.setApiKey('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');


const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const id = () => Math.random().toString(36).substring(2) + Date.now().toString(36);


/**********************
 * Example get method *
 **********************/

app.get('/photos', function(req, res) {
  const s3 = new AWS.S3();
  let params = {
    Bucket: 'photos141128-dev',
    Key: `protected/us-west-1:6981d95d-6192-4f17-9fcb-116abc5d75c9/${req.query.propPhoto}`
  };
  let promise = s3.getSignedUrlPromise('getObject', params);
  promise.then((url) => 
    res.send(url)
  , (err) => console.log(err))
})

app.get('/inventory', function(req, res) {
  let params = {
    TableName: "inventory-dev",
    Limit: 10,
    
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  
  return result;
});

app.get('/inventory/pages', function(req, res) {
  let params = {
    TableName: "inventory-dev",
    Limit: 10,
    ExclusiveStartKey: {
      id: req.query.id
    }
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  
  return result;
});

app.get('/inventory/:id', function(req, res) {
  let params = {
    TableName: "inventory-dev",
    Key: {
      id: req.query.id
    }
  }
  
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  
  return result;
});


// Get Employees
app.get('/employees', (req, res) => {
  let params = {
    TableName: 'employees-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
})

// Get Dispositions
app.get('/dispo', (req, res) => {
  let params = {
    TableName: 'dispo-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
})

// Get Dispositions
app.get('/dispoemployees', (req, res) => {
  let params = {
    TableName: 'dispoemployees-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
})

// Get Events
app.get('/events', (req, res) => {
  let params = {
    TableName: 'events-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
})

// Get Careers
app.get('/careers', (req, res) => {
  let params = {
    TableName: 'careers-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
})

// Get Applications
app.get('/applications', (req, res) => {
  let params = {
    TableName: 'applications-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
});

// Get Payouts
app.get('/payouts', (req, res) => {
  let params = {
    TableName: 'payouts-dev'
  }
  const result = docClient.scan(params, (err, data) => {
    if (err) res.json({ err })
    else res.json(data)
  })
  return result
})

/****************************
* Example post method *
****************************/

app.post('/sendgrid', async (req, res) => {
  const { address, senderID, segmentID, market, sender, pictureLink, line1, line2, line3, line4, line5, netPrice, arv, dispo, propPhoto, subjectLine } = req.body

  const s3 = new AWS.S3();
  let params = {
    Bucket: 'photos141128-dev',
    Key: `protected/us-west-1:6981d95d-6192-4f17-9fcb-116abc5d75c9/${propPhoto}`
  };
  let promise = s3.getSignedUrlPromise('getObject', params);
  const blastPhoto = await promise.then(url => {
    return url
  })


    const data = {
      "title": address.replace(', USA', ''),
        "subject": subjectLine,
        "sender_id": senderID,
        "segment_ids": segmentID,
        categories: [market, address, senderID, sender],
        asm:{
          group_id: 16468,
          groups_to_display: [
            16468
          ]
        },
        suppression_group_id: 16468,
        editor: 'design',
        "html_content": `
        <!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <!-- NAME: SIMPLE TEXT -->
    <!--[if gte mso 15]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>*|MC:SUBJECT|*</title>

    <style type="text/css">
      p {
        margin: 10px 0;
        padding: 0;
      }
      table {
        border-collapse: collapse;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        display: block;
        margin: 0;
        padding: 0;
      }
      img,
      a img {
        border: 0;
        height: auto;
        outline: none;
        text-decoration: none;
      }
      body,
      #bodyTable,
      #bodyCell {
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
      }
      .mcnPreviewText {
        display: none !important;
      }
      #outlook a {
        padding: 0;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      .ReadMsgBody {
        width: 100%;
      }
      .ExternalClass {
        width: 100%;
      }
      p,
      a,
      li,
      td,
      blockquote {
        mso-line-height-rule: exactly;
      }
      a[href^='tel'],
      a[href^='sms'] {
        color: inherit;
        cursor: default;
        text-decoration: none;
      }
      p,
      a,
      li,
      td,
      body,
      table,
      blockquote {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass td,
      .ExternalClass div,
      .ExternalClass span,
      .ExternalClass font {
        line-height: 100%;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      #bodyCell {
        padding: 10px;
      }
      .templateContainer {
        max-width: 600px !important;
      }
      a.mcnButton {
        display: block;
      }
      .mcnImage,
      .mcnRetinaImage {
        vertical-align: bottom;
      }
      .mcnTextContent {
        word-break: break-word;
      }
      .mcnTextContent img {
        height: auto !important;
      }
      .mcnDividerBlock {
        table-layout: fixed !important;
      }
      body,
      #bodyTable {
        /*@editable*/
        background-color: #ffffff;
        /*@editable*/
        background-image: none;
        /*@editable*/
        background-repeat: no-repeat;
        /*@editable*/
        background-position: center;
        /*@editable*/
        background-size: cover;
      }
      #bodyCell {
        /*@editable*/
        border-top: 0;
      }
      .templateContainer {
        /*@editable*/
        border: 0;
      }
      h1 {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 26px;
        /*@editable*/
        font-style: normal;
        /*@editable*/
        font-weight: bold;
        /*@editable*/
        line-height: 125%;
        /*@editable*/
        letter-spacing: normal;
        /*@editable*/
        text-align: left;
      }
      h2 {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 22px;
        /*@editable*/
        font-style: normal;
        /*@editable*/
        font-weight: bold;
        /*@editable*/
        line-height: 125%;
        /*@editable*/
        letter-spacing: normal;
        /*@editable*/
        text-align: left;
      }
      h3 {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 20px;
        /*@editable*/
        font-style: normal;
        /*@editable*/
        font-weight: bold;
        /*@editable*/
        line-height: 125%;
        /*@editable*/
        letter-spacing: normal;
        /*@editable*/
        text-align: left;
      }
      h4 {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 18px;
        /*@editable*/
        font-style: normal;
        /*@editable*/
        font-weight: bold;
        /*@editable*/
        line-height: 125%;
        /*@editable*/
        letter-spacing: normal;
        /*@editable*/
        text-align: left;
      }
      #templateHeader {
        /*@editable*/
        border-top: 0;
        /*@editable*/
        border-bottom: 0;
      }
      #templateHeader .mcnTextContent,
      #templateHeader .mcnTextContent p {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 16px;
        /*@editable*/
        line-height: 150%;
        /*@editable*/
        text-align: left;
      }
      #templateHeader .mcnTextContent a,
      #templateHeader .mcnTextContent p a {
        /*@editable*/
        color: #007c89;
        /*@editable*/
        font-weight: normal;
        /*@editable*/
        text-decoration: underline;
      }
      #templateBody {
        /*@editable*/
        border-top: 0;
        /*@editable*/
        border-bottom: 0;
      }
      #templateBody .mcnTextContent,
      #templateBody .mcnTextContent p {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 16px;
        /*@editable*/
        line-height: 150%;
        /*@editable*/
        text-align: left;
      }
      #templateBody .mcnTextContent a,
      #templateBody .mcnTextContent p a {
        /*@editable*/
        color: #007c89;
        /*@editable*/
        font-weight: normal;
        /*@editable*/
        text-decoration: underline;
      }
      #templateFooter {
        /*@editable*/
        border-top: 0;
        /*@editable*/
        border-bottom: 0;
      }
      #templateFooter .mcnTextContent,
      #templateFooter .mcnTextContent p {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-family: Helvetica;
        /*@editable*/
        font-size: 12px;
        /*@editable*/
        line-height: 150%;
        /*@editable*/
        text-align: left;
      }
      #templateFooter .mcnTextContent a,
      #templateFooter .mcnTextContent p a {
        /*@editable*/
        color: #202020;
        /*@editable*/
        font-weight: normal;
        /*@editable*/
        text-decoration: underline;
      }
      @media only screen and (min-width: 768px) {
        .templateContainer {
          width: 600px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        body,
        table,
        td,
        p,
        a,
        li,
        blockquote {
          -webkit-text-size-adjust: none !important;
        }
      }
      @media only screen and (max-width: 480px) {
        body {
          width: 100% !important;
          min-width: 100% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        #bodyCell {
          padding-top: 10px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnRetinaImage {
          max-width: 100% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImage {
          width: 100% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnCartContainer,
        .mcnCaptionTopContent,
        .mcnRecContentContainer,
        .mcnCaptionBottomContent,
        .mcnTextContentContainer,
        .mcnBoxedTextContentContainer,
        .mcnImageGroupContentContainer,
        .mcnCaptionLeftTextContentContainer,
        .mcnCaptionRightTextContentContainer,
        .mcnCaptionLeftImageContentContainer,
        .mcnCaptionRightImageContentContainer,
        .mcnImageCardLeftTextContentContainer,
        .mcnImageCardRightTextContentContainer,
        .mcnImageCardLeftImageContentContainer,
        .mcnImageCardRightImageContentContainer {
          max-width: 100% !important;
          width: 100% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnBoxedTextContentContainer {
          min-width: 100% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImageGroupContent {
          padding: 9px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnCaptionLeftContentOuter .mcnTextContent,
        .mcnCaptionRightContentOuter .mcnTextContent {
          padding-top: 9px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImageCardTopImageContent,
        .mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,
        .mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
          padding-top: 18px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImageCardBottomImageContent {
          padding-bottom: 9px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImageGroupBlockInner {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImageGroupBlockOuter {
          padding-top: 9px !important;
          padding-bottom: 9px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnTextContent,
        .mcnBoxedTextContentColumn {
          padding-right: 18px !important;
          padding-left: 18px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcnImageCardLeftImageContent,
        .mcnImageCardRightImageContent {
          padding-right: 18px !important;
          padding-bottom: 0 !important;
          padding-left: 18px !important;
        }
      }
      @media only screen and (max-width: 480px) {
        .mcpreview-image-uploader {
          display: none !important;
          width: 100% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Heading 1
	@tip Make the first-level headings larger in size for better readability on small screens.
	*/
        h1 {
          /*@editable*/
          font-size: 22px !important;
          /*@editable*/
          line-height: 125% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Heading 2
	@tip Make the second-level headings larger in size for better readability on small screens.
	*/
        h2 {
          /*@editable*/
          font-size: 20px !important;
          /*@editable*/
          line-height: 125% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Heading 3
	@tip Make the third-level headings larger in size for better readability on small screens.
	*/
        h3 {
          /*@editable*/
          font-size: 18px !important;
          /*@editable*/
          line-height: 125% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Heading 4
	@tip Make the fourth-level headings larger in size for better readability on small screens.
	*/
        h4 {
          /*@editable*/
          font-size: 16px !important;
          /*@editable*/
          line-height: 150% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Boxed Text
	@tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
        table.mcnBoxedTextContentContainer td.mcnTextContent,
        td.mcnBoxedTextContentContainer td.mcnTextContent p {
          /*@editable*/
          font-size: 14px !important;
          /*@editable*/
          line-height: 150% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Header Text
	@tip Make the header text larger in size for better readability on small screens.
	*/
        td#templateHeader td.mcnTextContent,
        td#templateHeader td.mcnTextContent p {
          /*@editable*/
          font-size: 16px !important;
          /*@editable*/
          line-height: 150% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Body Text
	@tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
	*/
        td#templateBody td.mcnTextContent,
        td#templateBody td.mcnTextContent p {
          /*@editable*/
          font-size: 16px !important;
          /*@editable*/
          line-height: 150% !important;
        }
      }
      @media only screen and (max-width: 480px) {
        /*
	@tab Mobile Styles
	@section Footer Text
	@tip Make the footer content text larger in size for better readability on small screens.
	*/
        td#templateFooter td.mcnTextContent,
        td#templateFooter td.mcnTextContent p {
          /*@editable*/
          font-size: 14px !important;
          /*@editable*/
          line-height: 150% !important;
        }
      }
    </style>
  </head>
  <body>
    <!--*|IF:MC_PREVIEW_TEXT|*-->

    <!--*|END:IF|*-->
    <center>
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        id="bodyTable"
      >
        <tr>
          <td align="left" valign="top" id="bodyCell">
            <!-- BEGIN TEMPLATE // -->

            <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                        <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        <![endif]-->
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              class="templateContainer"
            >
              <tr>
                <td valign="top" id="templateHeader"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
<div><img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/banner.png" height="120" style="border: 0px;width: 450px;margin: 0px;padding-left: 20px;" width="500" margin-left="500px"></div>

<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
  <tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top:9px;"><!--[if mso]><table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr><![endif]--><!--[if mso]><td valign="top" width="600" style="width:600px;"><![endif]--><table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px; font-family: Times New Roman, Times, Baskerville, Georgia, serif; line-height: 150%;"><p style="font-family: Times New Roman, Times, Baskerville, Georgia, serif; line-height: 150%;">
  <img data-file-id="730965" height="337" src="${blastPhoto}" style="border: 0px ; width: 450px; height: 337px; margin: 0px;"width="450">
  <br>
  <span style="font-family:times new roman,times,baskerville,georgia,serif"><span style="font-size:24px"><br><u></u>${address.replace(', USA', '')}</u></span></span><br><br>
  <a href="${pictureLink}"target="_blank"><span style="font-family:times new roman,times,baskerville,georgia,serif"><u><span style="font-size:18px">Link to More Pictures!</span></u></span></a></p>
  <ul></ul>
  <li style="${line1 != '' ? "display: list-item" : "display: none"}">${line1}</li>
  <li style="${line2 != '' ? "display: list-item" : "display: none"}">${line2}</li>
  <li style="${line3 != '' ? "display: list-item" : "display: none"}">${line3}</li>
  <li style="${line4 != '' ? "display: list-item" : "display: none"}">${line4}</li>
  <li style="${line5 != '' ? "display: list-item" : "display: none"}">${line5}</li></ul>
  <span style="font-size:22px"><span style="font-family:times new roman,times,baskerville,georgia,serif"><span style="color: #008000"><em></em><br><br><span style="${netPrice != '' ? "display: block" : "display: none"}">Wholesale Price: ${netPrice}</span><span style="${arv != '' ? "display: block" : "display: none"}">After Repair Value: ${arv}</span></em></span></span></span><br><p style="font-family: Times New Roman, Times, Baskerville, Georgia, serif; line-height: 150%;"><span style="font-size:26px"><span style="color:#A52A2A"><span style="font-family:times new roman,times,baskerville,georgia,serif"></span>${dispo}</span></span></span></p><hr> </td></tr></tbody></table><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></td></tr></tbody></table>                            </td>
                        </tr>
                        <tr>
                            <td valign="top" id="templateBody">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                    <tbody class="mcnTextBlockOuter">
                                        <tr>
                                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                <!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

                                                <!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                    <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                                                                <div style="text-align: center; font-size: smaller;"><span style="color:#A9A9A9">Disclaimer: all homes listed herein are either owned or under contract by aem real estate group, llc (dba keyglee dispo) ("seller"). seller is in the business of acquiring properties and selling wholesale to investors, among other real estate investing activities. properties are acquired through a variety of sources. the prices are net to seller.  buyer pays all closing/escrow costs including hoa transfer/reserves and any other fees associated with the transfer of property.  prices are based on quick closing of 7-14 days or less, using cash or a combination of cash and private financing/hard money. all properties are sold in 'as is' condition. arv values are estimates, buyer to verify. seller makes no warranty of any kind, expressed or implied, regarding the condition, square footage, insurability, verification of septic or sewer connection, structural, plumbing, electrical or mechanical systems, wells, heating, air conditioning, appliances, soil, foundation, pool/spa, and related equipment, environmental hazards (such as asbestos, formaldehyde, radon gas, lead based paint, fuel or chemical storage tanks, hazardous waste, landfills, high voltage electrical lines, location near superfund areas, endangered species, water quality, geological conditions), location of property lines, water/utility use restrictions, flood plain, building permits or compliance with building codes, zoning, the occurrence of disease, death, homicide, suicide, or other crime in the vicinity of the premises.  everything, not limited to the above referenced items, is the responsibility of the buyer to investigate and satisfy to a level suitable to the buyer, prior to signing a contract to purchase the property and/or depositing earnest money funds. typically, seller will gather information regarding square footage, lot size, year built, condition, values, etc from the county assessor's website, public tax records, prior mls listings, and other sources that might be available. although the information should be accurate, these sources have been known to produce wrong information on occasion. seller is not held liable for any information released to the buyer from any source referenced for the buyer's convenience. buyer must do its own due diligence, evaluation and inspection prior to making an offer.  determining value is the buyer's responsibility.  seller strongly recommends buyers employ an investor-focused realtor or appraiser to help determine current and/or after repair value.  any reference to the value of a property by seller or any representative of seller is simply an opinion of value.  everyone has a differing opinion on value, cost of construction, materials, quality of workmanship and market speculation.  value is ultimately the buyer's responsibility and they should be diligent in determining market value. seller may or may not currently own all of the properties listed herein and may be marketing the equitable interest however great or small in the given properties. some of these properties listed on this site are under contract to purchased by seller. as regards such properties, seller is only selling (without any warranty or representation other than it is the buyer under the subject contract) its contract rights as purchaser of such property. some properties are occupied, as indicated. if shown as occupied, buyer is to contact seller to set up viewing appointment.  buyer(s) and their representatives are hereby noticed of tenant/resident rights -- at no time shall residents be disturbed; no approaching the house, knocking on door, engaging in conversation with residents or neighbors, etc. transactions are completed through a title/escrow company, with buyer receiving a title insurance policy. equal opportunity housing. one or more members, directors, or employees of aem real estate group, llc (dba keyglee dispo) are licensed real estate agents in the state of arizona with stunning homes realty, west usa realty,  keller williams east valley, or coldwell banker, the state of nevada with compass realty & management llc, and/or the state of utah with wise choice real estate. there is no agency, expressed or implied, between buyer and keyglee dispo or any of its members, directors, or employees. One or more employees of KeyGlee Dispo is a licensed Real Estate Broker in the state of Washington with PC Management LLC.</span>
                                                                    <br>
                                                                    <br>
                                                                <div style="display: flex; height: 90px; justify-content: space-around; margin: auto;">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/CompasRealty_Logo.jpg">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/EqualHousingOpportunity_Logo.png">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/Keyglee_Logo.png">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/Reatlor_Logo.png">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/StunningHomesRealty_Logo.jpg">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/WestUSA_Logo.png">
                                                                    <img src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/charles-rutenberg.jpg" />
                                                                    <img src='https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/millerdiversified.jpg' />
                                                                    <!-- <img data-file-id="724865" height="128" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Disclaimer_Logos_FINAL.png" style="border: 0px  ; width: 700px; margin: 0px;" width="500"> -->
                                                                </div>
                                                                <br>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if mso]>
				</td>
				<![endif]-->

                                                <!--[if mso]>
				</tr>
				</table>
				<![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                    <tbody class="mcnTextBlockOuter">
                                        <tr>
                                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                <!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

                                                <!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                    <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                                                                <div style="text-align: center;"></div>
                                                                
                                                                <br>
                                                                
                                                                
                                                                

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <!--[if mso]>
				</td>
				<![endif]-->

                                                <!--[if mso]>
				</tr>
				</table>
				<![endif]-->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" id="templateFooter">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                                    <tbody class="mcnTextBlockOuter">
                                        <tr>
                                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                <!--[if mso]>
				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
				<tr>
				<![endif]-->

                                                <!--[if mso]>
				<td valign="top" width="600" style="width:600px;">
				<![endif]-->
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                                    <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                                                                <div style="text-align: center;">&nbsp;</div>
                                                                <br>
                                                                <br>
                                                                <br>
                                                                <br>
                                                                <br>
                                                                <br> &nbsp;
                                                            </td>
                                                        </tr>
                                                </table>
                                                <div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#444444;font-size:12px;line-height:20px;padding:16px 16px 16px 16px;text-align:center">
                                                    <div class="Unsubscribe--addressLine">
                                                        <p class="Unsubscribe--senderName" style="font-family:Arial,Helvetica, sans-serif;font-size:12px;line-height:20px">[Sender_Name]</p>
                                                        <p style="font-family:Arial,Helvetica, sans-serif;font-size:12px;line-height:20px"><span class="Unsubscribe--senderAddress">[Sender_Address]</span>, <span class="Unsubscribe--senderCity">[Sender_City]</span>, <span class="Unsubscribe--senderState">[Sender_State]</span> <span class="Unsubscribe--senderZip">[Sender_Zip]</span> </p>
                                                    </div>
                                                    <p style="font-family:Arial,Helvetica, sans-serif;font-size:12px;line-height:20px"><a class="Unsubscribe--unsubscribeLink" href="[unsubscribe]">Unsubscribe</a> - <a class="Unsubscribe--unsubscribePreferences" href="<%asm_preferences_raw_url%>">Unsubscribe Preferences</a></p>
                                                </div>
                                            </td>
                                        </tr>
                                </table>

                        </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    <!-- // END TEMPLATE -->
                    </td>
            </tr>
        </table>
    </center>
</body>

</html>

<html>
`,
        "status": "Draft"
    };

    const request = {
      url: `/v3/campaigns`,
      method: 'POST',
      body: data,
  };

  client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(body);
  })
  .catch(error => {
    console.error(error);
  });

  console.log(res)

})

app.post('/inventory', function(req, res) {


  let params = {
    TableName : "inventory-dev",
    Item: {
      id: `Acq-${id()}`,
      date: req.body.date,
        status: req.body.status,
        name: req.body.name,
        dispoName: req.body.dispoName,
        dispoPhone: req.body.dispoPhone,
        dispoEmail: req.body.dispoEmail,
        dispoName2: req.body.dispoName2,
        dispoPhone2: req.body.dispoPhone2,
        dispoEmail2: req.body.dispoEmail2,
        dealulator: req.body.dealulator,
        exclusive: req.body.exclusive,
        supplier: req.body.supplier,
        supplierName: req.body.supplierName,
        supplierEmail: req.body.supplierEmail,
        supplierPhone: req.body.supplierPhone,
        address: req.body.address,
        propType: req.body.propType,
        arv: req.body.arv,
        netPrice: req.body.netPrice,
        salePrice: req.body.salePrice,
        emd: req.body.emd,
        optionFee: req.body.optionFee,
        dealSplit: req.body.dealSplit,
        underlyingContract: req.body.underlyingContract,
        coe: req.body.coe,
        titleCompany: req.body.titleCompany,
        typeAccess: req.body.typeAccess,
        postPossession: req.body.postPossession,
        vacantCOE: req.body.vacantCOE,
        tenantOccupied: req.body.tenantOccupied,
        leaseTerm: req.body.leaseTerm,
        notes: req.body.notes,
        beds: req.body.beds,
        baths: req.body.baths,
        parking: req.body.parking,
        pool: req.body.pool,
        livingArea: req.body.livingArea,
        lotSize: req.body.lotSize,
        year: req.body.year,
        condition: req.body.condition,
        pictureLink: req.body.pictureLink,
        market: req.body.market,
        propPhoto: req.body.propPhoto,
        uploadContract: req.body.uploadContract,
        audited: req.body.audited,
        acqDrop: req.body.acqDrop,
        acqIncrease: req.body.acqIncrease,
        dispoContractPrice: req.body.dispoContractPrice,
        dispoPriceDrop: req.body.dispoPriceDrop,
        dispoPriceIncrease: req.body.dispoPriceIncrease,
        secondLegCredits: req.body.secondLegCredits,
        secondLegDebits: req.body.secondLegDebits,
        buyerCredits: req.body.buyerCredits,
        perDiem: req.body.perDiem,
        goodsSold: req.body.goodsSold,
        addComp: req.body.addComp,
        dueToUs: req.body.dueToUs,
        submitBy: req.body.submitBy,
        lat: req.body.lat,
        lng: req.body.lng,
        agentWriting: req.body.agentWriting,
        fileName: req.body.fileName,
        segmentID: req.body.segmentID,
        senderID: req.body.senderID,
        writeContract: req.body.writeContract,
        emailPhoto: req.body.emailPhoto
    }
  };
  docClient.put(params, (err, data) => {
    if (err) res.json({ err })
    else res.json({ success: data })
  })
});


// Dispositions Post
app.post('/dispo', (req, res) => {

  let params = {
    TableName: 'dispo-dev',
    Item: {
      id: `D-${id()}`,
      date: req.body.date,
      name: req.body.name,
      address: req.body.address,
      buyer: req.body.buyer,
      doubleEscrow: req.body.doubleEscrow,
      titleCompany: req.body.titleCompany,
      titleOfficer: req.body.titleOfficer,
      titleEmail: req.body.titleEmail,
      titlePhone: req.body.titlePhone,
      signersName: req.body.signersName,
      vesting: req.body.vesting,
      contractPricing: req.body.contractPricing,
      emd: req.body.emd,
      closing: req.body.closing,
      coe: req.body.coe,
      closeSooner: req.body.closeSooner,
      contractExecuted: req.body.contractExecuted,
      buyersPhone: req.body.buyersPhone,
      emailSignature: req.body.emailSignature,
      contractSignature: req.body.contractSignature,
      emDeposit: req.body.emDeposit,
      buyerType: req.body.buyerType,
      projectedProfit: req.body.projectedProfit
    }
  };
  docClient.put(params, (err, data) => {
    if (err) res.json({ err })
    else res.json({ success: data })
  })
})

// Events Post
app.post('/events', (req, res) => {

  let params = {
    TableName: 'events-dev',
    Item: {
      id: `E-${id()}`,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      display: req.body.display,
      backgroundColor: req.body.backgroundColor,
      allDay: req.body.allDay,
      textColor: req.body.textColor,
      fontWeight: req.body.fontWeight
    }
  };
  docClient.put(params, (err, data) => {
    if (err) res.json({ err })
    else res.json({ success: data })
  })
});

// Careers Post
app.post('/careers', (req, res) => {

  let params = {
    TableName: 'careers-dev',
    Item: {
      id: `C-${id()}`,
      jobTitle: req.body.jobTitle,
      date: req.body.date,
      location: req.body.location,
      responsibilities1: req.body.responsibilities1,
      responsibilities2: req.body.responsibilities2,
      responsibilities3: req.body.responsibilities3,
      responsibilities4: req.body.responsibilities4,
      responsibilities5: req.body.responsibilities5,
      responsibilities6: req.body.responsibilities6,
      responsibilities7: req.body.responsibilities7,
      requirements1: req.body.requirements1,
      requirements2: req.body.requirements2,
      requirements3: req.body.requirements3,
      requirements4: req.body.requirements4,
      requirements5: req.body.requirements5,
      requirements6: req.body.requirements6,
      requirements7: req.body.requirements7,
      benefits1: req.body.benefits1,
      benefits2: req.body.benefits2,
      benefits3: req.body.benefits3,
      benefits4: req.body.benefits4,
      benefits5: req.body.benefits5,
      benefits6: req.body.benefits6,
      benefits7: req.body.benefits7
    }
  };
  docClient.put(params, (err, data) => {
    if (err) res.json({ err })
    else res.json({ success: data })
  })
});

// Applications Post
app.post('/applications', (req, res) => {

  let params = {
    TableName: 'applications-dev',
    Item: {
      id: `App-${id()}`,
      position: req.body.position,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      experience: req.body.experience,
      license: req.body.license,
      resume: req.body.resume,
      date: req.body.date
    }
  };
  docClient.put(params, (err, data) => {
    if (err) res.json({ err })
    else res.json({ success: data })
  })
});

// Payouts Post
app.post('/payouts', (req, res) => {

  let params = {
    TableName: 'payouts-dev',
    Item: {
      id: `P-${id()}`,
      month: req.body.month,
      name: req.body.name,
      paid: req.body.paid,
      phone: req.body.phone,
      grossProfit: req.body.grossProfit,
    }
  };
  docClient.put(params, (err, data) => {
    if (err) res.json({ err })
    else res.json({ success: data })
  })
});



// app.post('/properties/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'post call succeed!', url: req.url, body: req.body})
// });

/****************************
* Put method *
****************************/

// Acq Drop
app.put('/properties/:id/acqdrop', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set acqDrop = :acqDrop',
    ExpressionAttributeValues: {
      ':acqDrop': req.body.acqDrop
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Acq Increase
app.put('/properties/:id/acqincrease', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set acqIncrease = :acqIncrease',
    ExpressionAttributeValues: {
      ':acqIncrease': req.body.acqIncrease
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Add Comp
app.put('/properties/:id/addcomp', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set addComp = :addComp',
    ExpressionAttributeValues: {
      ':addComp': req.body.addComp
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Additional Cost
app.put('/properties/:id/additionalcost', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set additionalCost = :additionalCost',
    ExpressionAttributeValues: {
      ':additionalCost': req.body.additionalCost
    },
    ReturnValues: 'ALL_NEW'
  }

    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Wholesale Price
app.put('/properties/:id/audited', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },

    UpdateExpression: 'set audited = :audited',
    ExpressionAttributeValues: {
      ':audited': req.body.audited
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Wholesale Price
app.put('/properties/:id/tc', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },

    UpdateExpression: 'set tc = :tc',
    ExpressionAttributeValues: {
      ':tc': req.body.tc
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Buyer Acq Date
app.put('/properties/:id/buyeracqdate', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerAcqDate = :buyerAcqDate',
    ExpressionAttributeValues: {
      ':buyerAcqDate': req.body.buyerAcqDate
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Close Date
app.put('/properties/:id/buyerclosedate', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerCloseDate = :buyerCloseDate',
    ExpressionAttributeValues: {
      ':buyerCloseDate': req.body.buyerCloseDate
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Contact
app.put('/properties/:id/buyercontact', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerContact = :buyerContact',
    ExpressionAttributeValues: {
      ':buyerContact': req.body.buyerContact
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Credits
app.put('/properties/:id/buyercredits', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerCredits = :buyerCredits',
    ExpressionAttributeValues: {
      ':buyerCredits': req.body.buyerCredits
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Docs
app.put('/properties/:id/buyerdocs', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerDocs = :buyerDocs',
    ExpressionAttributeValues: {
      ':buyerDocs': req.body.buyerDocs
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer EMD
app.put('/properties/:id/buyeremd', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerEMD = :buyerEMD',
    ExpressionAttributeValues: {
      ':buyerEMD': req.body.buyerEMD
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer EMD Date
app.put('/properties/:id/buyeremddate', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerEMDDate = :buyerEMDDate',
    ExpressionAttributeValues: {
      ':buyerEMDDate': req.body.buyerEMDDate
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Earnest
app.put('/properties/:id/buyersearnest', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyersEarnest = :buyersEarnest',
    ExpressionAttributeValues: {
      ':buyersEarnest': req.body.buyersEarnest
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Commissions
app.put('/properties/:id/commissions', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set commissions = :commissions',
    ExpressionAttributeValues: {
      ':commissions': req.body.commissions
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Commitment and Relations
app.put('/properties/:id/commitrelation', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set commitRelation = :commitRelation',
    ExpressionAttributeValues: {
      ':commitRelation': req.body.commitRelation
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Completion Date
app.put('/properties/:id/completiondate', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':completionDate': req.body.completionDate
    },
    UpdateExpression: 'set completionDate = :completionDate',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Dispo Contract Price
app.put('/properties/:id/dispocontractprice', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set dispoContractPrice = :dispoContractPrice',
    ExpressionAttributeValues: {
      ':dispoContractPrice': req.body.dispoContractPrice
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Dispo Price Drop
app.put('/properties/:id/dispopricedrop', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set dispoPriceDrop = :dispoPriceDrop',
    ExpressionAttributeValues: {
      ':dispoPriceDrop': req.body.dispoPriceDrop
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Dispo Price Increase
app.put('/properties/:id/dispopriceincrease', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set dispoPriceIncrease = :dispoPriceIncrease',
    ExpressionAttributeValues: {
      ':dispoPriceIncrease': req.body.dispoPriceIncrease
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Due to Us
app.put('/properties/:id/duetous', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set dueToUs = :dueToUs',
    ExpressionAttributeValues: {
      ':dueToUs': req.body.dueToUs
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Earnest Deposit
app.put('/properties/:id/statusearnest', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set statusEarnest = :statusEarnest',
    ExpressionAttributeValues: {
      ':statusEarnest': req.body.statusEarnest
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// EMD
app.put('/properties/:id/emd', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set emd = :emd',
    ExpressionAttributeValues: {
      ':emd': req.body.emd
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// EMD Check
app.put('/properties/:id/emdcheck', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set emdCheck = :emdCheck',
    ExpressionAttributeValues: {
      ':emdCheck': req.body.emdCheck
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Escrow Officer
app.put('/properties/:id/escrowofficer', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set escrowOfficer = :escrowOfficer',
    ExpressionAttributeValues: {
      ':escrowOfficer': req.body.escrowOfficer
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// File Notes
app.put('/properties/:id/filenotes', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':fileNotes': req.body.fileNotes
    },
    UpdateExpression: 'set fileNotes = :fileNotes',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Files
app.put('/properties/:id/files', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeNames: {
      '#files': 'files'
    },
    ExpressionAttributeValues: {
      ':files': [req.body.files],
    },
    UpdateExpression: 'set #files = list_append(if_not_exists(#files, :files), :files)',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// File Type
app.put('/properties/:id/filetype', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':fileType': req.body.fileType
    },
    UpdateExpression: 'set fileType = :fileType',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// First Leg Credits
app.put('/properties/:id/firstlegcredits', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':firstLegCredits': req.body.firstLegCredits
    },
    UpdateExpression: 'set firstLegCredits = :firstLegCredits',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// First Leg Debits
app.put('/properties/:id/firstlegdebits', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':firstLegDebits': req.body.firstLegDebits
    },
    UpdateExpression: 'set firstLegDebits = :firstLegDebits',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Goods Sold
app.put('/properties/:id/goodssold', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':goodsSold': req.body.goodsSold
    },
    UpdateExpression: 'set goodsSold = :goodsSold',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Inspection Period
app.put('/properties/:id/inspectionperiod', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':inspectionPeriod': req.body.inspectionPeriod
    },
    UpdateExpression: 'set inspectionPeriod = :inspectionPeriod',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Market
app.put('/properties/:id/market', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':market': req.body.market
    },
    UpdateExpression: 'set market = :market',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Option Fee
app.put('/properties/:id/optionfee', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':optionFee': req.body.optionFee
    },
    UpdateExpression: 'set optionFee = :optionFee',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Payout Recipient
app.put('/properties/:id/payoutrecipient', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':payoutRecipient': req.body.payoutRecipient
    },
    UpdateExpression: 'set payoutRecipient = :payoutRecipient',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Payouts
app.put('/properties/:id/payouts', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':payouts': req.body.payouts
    },
    UpdateExpression: 'set payouts = :payouts',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Per Diem
app.put('/properties/:id/perdiem', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':perDiem': req.body.perDiem
    },
    UpdateExpression: 'set perDiem = :perDiem',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Post Possession
app.put('/properties/:id/postpossession', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':postPossession': req.body.postPossession
    },
    UpdateExpression: 'set postPossession = :postPossession',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Pricing Date
app.put('/properties/:id/pricingdate', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':pricingDate': req.body.pricingDate
    },
    UpdateExpression: 'set pricingDate = :pricingDate',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Second Escrow
app.put('/properties/:id/secondescrow', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':secondEscrow': req.body.secondEscrow
    },
    UpdateExpression: 'set secondEscrow = :secondEscrow',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Second Leg Credits
app.put('/properties/:id/secondlegcredits', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':secondLegCredits': req.body.secondLegCredits
    },
    UpdateExpression: 'set secondLegCredits = :secondLegCredits',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Second Leg Debits
app.put('/properties/:id/secondlegdebits', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':secondLegDebits': req.body.secondLegDebits
    },
    UpdateExpression: 'set secondLegDebits = :secondLegDebits',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Status Docs
app.put('/properties/:id/statusdocs', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':statusDocs': req.body.statusDocs
    },
    UpdateExpression: 'set statusDocs = :statusDocs',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Sold By
app.put('/properties/:id/soldby', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':soldBy': req.body.soldBy
    },
    UpdateExpression: 'set soldBy = :soldBy',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Sold Gross Profit
app.put('/properties/:id/soldgp', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':soldGP': req.body.soldGP
    },
    UpdateExpression: 'set soldGP = :soldGP',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Status
app.put('/properties/:id/status', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':status': req.body.status
    },
    UpdateExpression: 'set status = :status',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Status GP
app.put('/properties/:id/statusgp', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':statusGP': req.body.statusGP
    },
    UpdateExpression: 'set statusGP = :statusGP',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Status Payouts
app.put('/properties/:id/statuspayouts', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':statusPayouts': req.body.statusPayouts
    },
    UpdateExpression: 'set statusPayouts = :statusPayouts',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Supplier
app.put('/properties/:id/supplier', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':supplier': req.body.supplier
    },
    UpdateExpression: 'set supplier = :supplier',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Territory
app.put('/properties/:id/territory', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':territory': req.body.territory
    },
    UpdateExpression: 'set territory = :territory',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Transaction Type
app.put('/properties/:id/transactiontype', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':transactionType': req.body.transactionType
    },
    UpdateExpression: 'set transactionType = :transactionType',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Who Assisted
app.put('/properties/:id/whoassisted', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':whoAssisted': req.body.whoAssisted
    },
    UpdateExpression: 'set whoAssisted = :whoAssisted',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Sale Price
app.put('/properties/:id/saleprice', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },

    UpdateExpression: 'set salePrice = :salePrice',
    ExpressionAttributeValues: {
      ':salePrice': req.body.salePrice
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });


});

// Wholesale Price
app.put('/properties/:id/netprice', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },

    UpdateExpression: 'set netPrice = :netPrice',
    ExpressionAttributeValues: {
      ':netPrice': req.body.netPrice
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });


});

// Who Sold
app.put('/properties/:id/whosold', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },

    UpdateExpression: 'set whoSold = :whoSold',
    ExpressionAttributeValues: {
      ':whoSold': req.body.whoSold
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});


// Update Application Notes
app.put('/applications/:id', function (req, res) {

  let params = {
    TableName: 'applications-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeNames: {
      '#notes': 'notes'
    },
    ExpressionAttributeValues: {
      ':notes': [req.body.notes],
    },
    UpdateExpression: 'set #notes = list_append(if_not_exists(#notes, :notes), :notes)',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// app.put('/properties/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

/****************************
* Example delete method *
****************************/

app.delete('/properties', function(req, res) {
  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id
    }
  }
  docClient.delete(params, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  })
});

app.delete('/payouts', function(req, res) {
  let params = {
    TableName: 'payouts-dev',
    Key: {
      id: req.body.id
    }
  }
  docClient.delete(params, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  })
});

app.put('/properties/:id/files/:fileid', function(req, res) {
  let params = {
    TableName: 'inventory-dev',
    Key: {
        id: req.body.id
    },
    UpdateExpression: `REMOVE files.map(file => file.fileID === ${req.body.fileID} && file.fildID)`,
    ReturnValues: "ALL_NEW"
  }
  docClient.update(params, (err, data) => {
    if (err) console.log(err);
    else res.json({ success: data });
  })

  
});

// app.delete('/properties/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
