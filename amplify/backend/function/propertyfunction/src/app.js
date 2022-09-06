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
    Key: `protected/us-west-1:cb17aa96-b9c7-4573-881d-3365824080b7/${req.query.propPhoto}`
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

app.get('/properties', function(req, res) {
  let params = {
    TableName: "inventory-dev",
    
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

// Get Files

app.get('/getfiles', (req, res) => {
  const s3 = new AWS.S3();

  const params = {
    Key: `us-west-1:144c3712-aba0-439a-8ab3-3dff559428e3/${req.query.files}`,
    Bucket: 'photos141128-dev'
  };

  s3.getSignedUrl('getObject', params, function (err, url) {
    if (err) {
      console.error(err)
      next(err);
    } else {
      res.send(url)
    }
  })
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
    Key: `protected/us-west-1:cb17aa96-b9c7-4573-881d-3365824080b7/${propPhoto}`
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 800px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->

    <style type="text/css">
      body, p, div {
        font-family: helvetica,arial,sans-serif;
        font-size: 22px;
      }
      body {
        color: #ffffff;
      }
      body a {
        color: #5dfee8;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
            text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 480px !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    
     <!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#5dfee8" data-body-style="font-size: 22px; font-family: helvetica,arial,sans-serif; color: #ffffff; background-color: #d2e4f9;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#d2e4f9">
          <tr>
            <td valign="top" bgcolor="#d2e4f9" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="800">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:800px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding: 010px 00px 00px 00px; color: #ffffff; text-align: left;" bgcolor="#1C76D1" width="100%" align="left">
                              
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:9px 0px 9px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <h1 style="text-align: center;"><span style="font-family:tahoma,geneva,sans-serif;">Keyglee Dispo</span></h1>

        </td>
      </tr>
    </table>
  
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:00px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="${blastPhoto}" alt="Photo of ${address.replace(', USA', '')}" width="800">
        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:025px 0px 025px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <div style="text-align: center;"><span style="font-family:lucida sans unicode,lucida grande,sans-serif;"><span style="font-size:28px;">${address.replace(', USA', '')}</span></span></div>

        </td>
      </tr>
    </table>
  
    <table class="module"
           role="module"
           data-type="divider"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 0px 0px;background-color:#ffffff;"
            role="module-content"
            height="100%"
            valign="top"
            bgcolor="#ffffff">
          <table border="0"
                 cellpadding="0"
                 cellspacing="0"
                 align="center"
                 width="100%"
                 height="2px"
                 style="line-height:2px; font-size:2px;">
            <tr>
              <td
                style="padding: 0px 0px 2px 0px;"
                bgcolor="#ffffff"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:30px 0px 18px 50px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <div><a style="color: #5DFEE8" href="${pictureLink}"><font face="georgia, serif"><span style="font-size: 24px;"><u>View property photos</u></span></font></a></div>

        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#1C76D1;padding:10px 50px 30px 50px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="#1C76D1">
            <ul>
	<li style="${line1 != '' ? "display: list-item" : "display: none"}><span style="font-family:courier,monospace;"><span style="color:#FFFFFF;">${line1}</span></span></li>
	<li style="${line2 != '' ? "display: list-item" : "display: none"}><span style="font-family:courier,monospace;"><span style="color:#FFFFFF;">${line2}</span></span></li>
	<li style="${line3 != '' ? "display: list-item" : "display: none"}><span style="font-family:courier,monospace;"><span style="color:#FFFFFF;">${line3}</span></span></li>
	<li style="${line4 != '' ? "display: list-item" : "display: none"}><span style="font-family:courier,monospace;"><span style="color:#FFFFFF;">${line4}</span></span></li>
</ul>

        </td>
      </tr>
    </table>
  
    <table class="module"
           role="module"
           data-type="divider"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 0px 0px;"
            role="module-content"
            height="100%"
            valign="top"
            bgcolor="">
          <table border="0"
                 cellpadding="0"
                 cellspacing="0"
                 align="center"
                 width="100%"
                 height="2px"
                 style="line-height:2px; font-size:2px;">
            <tr>
              <td
                style="padding: 0px 0px 2px 0px;"
                bgcolor="#ffffff"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="background-color:#1C76D1;padding:30px 0px 18px 0px;line-height:22px;text-align:center;"
            height="100%"
            valign="top"
            bgcolor="#1C76D1">
            <h3 style="${netPrice != '' ? "display: block" : "display: none"}"><span style="color:#0ef7bd;"><span style="font-family:times new roman,times,serif;">Wholesale Price: ${netPrice}</span></span></h3>

<h3 style="${arv != '' ? "display: block" : "display: none"}"><span style="color:#0ef7bd;"><span style="font-family:times new roman,times,serif;">After Repair Value: ${arv}</span></span></h3>

        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:8px 0px 25px 0px;line-height:22px;text-align:center;"
            height="100%"
            valign="top"
            bgcolor="">
            <div style="${dispo != '' ? "display: block" : "display: none"}"><span style="color:#fe5d61;"><span style="font-size:28px;">${dispo}</span></span></div>

        </td>
      </tr>
    </table>
  
    <table  border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            data-version="2"
            style="background-color:#ffffff;padding:040px 0px 40px 0px;"
            bgcolor="#ffffff">
      <tr role='module-content'>
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="800.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="800.000"
            style="width:800.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-0 of-1
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 0px 0px;background-color:#ffffff"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#1C76D1" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a href="https://keygleedispo.com/" style="background-color:#1C76D1;border:1px solid #333333;border-color:#333333;border-radius:6px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:20px;padding:18px 18px 18px 18px;text-align:center;text-decoration:none;cursor:pointer" target="_blank">View more properties</a></td></tr></tbody></table></td></tr></tbody></table>
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 0px 0px;line-height:22px;text-align:inherit;"
            height="100%"
            valign="top"
            bgcolor="">
            <div style="text-align: center;">&nbsp;</div>

<div style="text-align: center;"><span style="font-size:8px;">&nbsp;Disclaimer: all homes listed herein are either owned or under contract by aem real estate group, llc (dba keyglee dispo) (&quot;seller&quot;). seller is in the business of acquiring properties and selling wholesale to investors, among other real estate investing activities. properties are acquired through a variety of sources. the prices are net to seller. buyer pays all closing/escrow costs including hoa transfer/reserves and any other fees associated with the transfer of property. prices are based on quick closing of 7-14 days or less, using cash or a combination of cash and private financing/hard money. all properties are sold in &#39;as is&#39; condition. arv values are estimates, buyer to verify. seller makes no warranty of any kind, expressed or implied, regarding the condition, square footage, insurability, verification of septic or sewer connection, structural, plumbing, electrical or mechanical systems, wells, heating, air conditioning, appliances, soil, foundation, pool/spa, and related equipment, environmental hazards (such as asbestos, formaldehyde, radon gas, lead based paint, fuel or chemical storage tanks, hazardous waste, landfills, high voltage electrical lines, location near superfund areas, endangered species, water quality, geological conditions), location of property lines, water/utility use restrictions, flood plain, building permits or compliance with building codes, zoning, the occurrence of disease, death, homicide, suicide, or other crime in the vicinity of the premises. everything, not limited to the above referenced items, is the responsibility of the buyer to investigate and satisfy to a level suitable to the buyer, prior to signing a contract to purchase the property and/or depositing earnest money funds. typically, seller will gather information regarding square footage, lot size, year built, condition, values, etc from the county assessor&#39;s website, public tax records, prior mls listings, and other sources that might be available. although the information should be accurate, these sources have been known to produce wrong information on occasion. seller is not held liable for any information released to the buyer from any source referenced for the buyer&#39;s convenience. buyer must do its own due diligence, evaluation and inspection prior to making an offer. determining value is the buyer&#39;s responsibility. seller strongly recommends buyers employ an investor-focused realtor or appraiser to help determine current and/or after repair value. any reference to the value of a property by seller or any representative of seller is simply an opinion of value. everyone has a differing opinion on value, cost of construction, materials, quality of workmanship and market speculation. value is ultimately the buyer&#39;s responsibility and they should be diligent in determining market value. seller may or may not currently own all of the properties listed herein and may be marketing the equitable interest however great or small in the given properties. some of these properties listed on this site are under contract to purchased by seller. as regards such properties, seller is only selling (without any warranty or representation other than it is the buyer under the subject contract) its contract rights as purchaser of such property. some properties are occupied, as indicated. if shown as occupied, buyer is to contact seller to set up viewing appointment. buyer(s) and their representatives are hereby noticed of tenant/resident rights -- at no time shall residents be disturbed; no approaching the house, knocking on door, engaging in conversation with residents or neighbors, etc. transactions are completed through a title/escrow company, with buyer receiving a title insurance policy. equal opportunity housing. one or more members, directors, or employees of aem real estate group, llc (dba keyglee dispo) are licensed real estate agents in the state of arizona with stunning homes realty, west usa realty, keller williams east valley, or coldwell banker, the state of nevada with compass realty &amp; management llc, and/or the state of utah with wise choice real estate. there is no agency, expressed or implied, between buyer and keyglee dispo or any of its members, directors, or employees. One or more employees of KeyGlee Dispo is a licensed Real Estate Broker in the state of Washington with PC Management LLC.</span></div>

        </td>
      </tr>
    </table>
  
    <table  border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            data-version="2"
            style="background-color:#ffffff;padding:0px 0px 0px 0px;"
            bgcolor="#ffffff">
      <tr role='module-content'>
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-0 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/CompasRealty_Logo.jpg" alt="" width="200">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-1 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:50% !important;width:50%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/EqualHousingOpportunity_Logo.png" alt="" width="100">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-2 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:50% !important;width:50%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/Keyglee_Logo+-+Copy.png" alt="" width="100">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-3 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:50% !important;width:50%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/Reatlor_Logo.png" alt="" width="100">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </table>
  
    <table  border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            data-version="2"
            style="background-color:#ffffff;padding:0px 0px 0px 0px;"
            bgcolor="#ffffff">
      <tr role='module-content'>
        <td height="100%" valign="top">
            <!--[if (gte mso 9)|(IE)]>
              <center>
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                  <tr>
            <![endif]-->
          
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-0 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:50% !important;width:50%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/StunningHomesRealty_Logo.jpg" alt="" width="100">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-1 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/WestUSA_Logo.png" alt="" width="200">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-2 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:90% !important;width:90%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/charles-rutenberg.jpg" alt="" width="180">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <td width="200.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
    <![endif]-->

    <table  width="200.000"
            style="width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
            cellpadding="0"
            cellspacing="0"
            align="left"
            border="0"
            bgcolor="#ffffff"
            class="column column-3 of-4
                  empty"
      >
      <tr>
        <td style="padding:0px;margin:0px;border-spacing:0;">
            
    <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://kgt-internal.s3.us-west-1.amazonaws.com/SendGrid/AEM/MainTemplate/Logos/millerdiversified.jpg" alt="" width="200">
        </td>
      </tr>
    </table>
  
        </td>
      </tr>
    </table>

    <!--[if (gte mso 9)|(IE)]>
      </td>
    <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
                  <tr>
                </table>
              </center>
            <![endif]-->
        </td>
      </tr>
    </table>
  
    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 30px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>
  
    <table class="module"
           role="module"
           data-type="divider"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 0px 0px;"
            role="module-content"
            height="100%"
            valign="top"
            bgcolor="">
          <table border="0"
                 cellpadding="0"
                 cellspacing="0"
                 align="center"
                 width="100%"
                 height="3px"
                 style="line-height:3px; font-size:3px;">
            <tr>
              <td
                style="padding: 0px 0px 3px 0px;"
                bgcolor="#ffffff"></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  
    <table class="module"
           role="module"
           data-type="spacer"
           border="0"
           cellpadding="0"
           cellspacing="0"
           width="100%"
           style="table-layout: fixed;">
      <tr>
        <td style="padding:0px 0px 30px 0px;"
            role="module-content"
            bgcolor="">
        </td>
      </tr>
    </table>
  
    <table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tbody>
        <tr>
          <td valign="top" style="padding:0px 0px 0px 0px;font-size:6px;line-height:10px;">
            <table align="center">
              <tbody>
                <tr>
                  <td style="padding: 0px 5px;">
        <a role="social-icon-link"  href="https://www.facebook.com/keygleedispo/" target="_blank" alt="Facebook"
          data-nolink="false"
          title="Facebook "
          style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:rgb(254, 93, 97);">
          <img role="social-icon" alt="Facebook" title="Facebook "
            height="30"
            width="30"
            style="height: 30px, width: 30px"
            src="https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png" />
        </a>
      </td>
                  
                  <td style="padding: 0px 5px;">
        <a role="social-icon-link"  href="https://mc.sendgrid.com/assets/social/white/instagram.png" target="_blank" alt="Instagram"
          data-nolink="false"
          title="Instagram "
          style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:rgb(254, 93, 97);">
          <img role="social-icon" alt="Instagram" title="Instagram "
            height="30"
            width="30"
            style="height: 30px, width: 30px"
            src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" />
        </a>
      </td>
                  
                  
                  <td style="padding: 0px 5px;">
        <a role="social-icon-link"  href="https://www.linkedin.com/company/keyglee-dispo/" target="_blank" alt="LinkedIn"
          data-nolink="false"
          title="LinkedIn "
          style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:rgb(254, 93, 97);">
          <img role="social-icon" alt="LinkedIn" title="LinkedIn "
            height="30"
            width="30"
            style="height: 30px, width: 30px"
            src="https://marketing-image-production.s3.amazonaws.com/social/white/linkedin.png" />
        </a>
      </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  <div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#8d9db9;font-size:12px;line-height:20px;padding:16px 16px 16px 16px;text-align:center"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-family:Arial,Helvetica, sans-serif;font-size:12px;line-height:20px;color: white">[Sender_Name]</p><p style="font-family:Arial,Helvetica, sans-serif;font-size:12px;line-height:20px;color: white"><span class="Unsubscribe--senderAddress">[Sender_Address]</span>, <span class="Unsubscribe--senderCity">[Sender_City]</span>, <span class="Unsubscribe--senderState">[Sender_State]</span> <span class="Unsubscribe--senderZip">[Sender_Zip]</span> </p></div><p style="font-family:Arial,Helvetica, sans-serif;font-size:12px;line-height:20px"><a class="Unsubscribe--unsubscribeLink" href="<%asm_global_unsubscribe_raw_url%>">Unsubscribe</a> - <a class="Unsubscribe--unsubscribePreferences" href="<%asm_preferences_raw_url%>">Unsubscribe Preferences</a></p></div>
  <% Unsubscribe %>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td></tr></table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
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
        propStatus: req.body.propStatus,
        name: req.body.name,
        dispoName: req.body.dispoName,
        dispoPhone: req.body.dispoPhone,
        dispoEmail: req.body.dispoEmail,
        dispoName2: req.body.dispoName2,
        dispoPhone2: req.body.dispoPhone2,
        dispoEmail2: req.body.dispoEmail2,
        dealulator: req.body.dealulator,
        exclusive: req.body.exclusive,
        files: [req.body.files],
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

// Address
app.put('/properties/:id/address', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':address': req.body.address
    },
    UpdateExpression: 'set address = :address',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Baths
app.put('/properties/:id/baths', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set baths = :baths',
    ExpressionAttributeValues: {
      ':baths': req.body.baths
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Beds
app.put('/properties/:id/beds', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set beds = :beds',
    ExpressionAttributeValues: {
      ':beds': req.body.beds
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Parking
app.put('/properties/:id/parking', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set parking = :parking',
    ExpressionAttributeValues: {
      ':parking': req.body.parking
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// ARV
app.put('/properties/:id/arv', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set arv = :arv',
    ExpressionAttributeValues: {
      ':arv': req.body.arv
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Living Area
app.put('/properties/:id/livingarea', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set livingArea = :livingArea',
    ExpressionAttributeValues: {
      ':livingArea': req.body.livingArea
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Lot Size
app.put('/properties/:id/lotsize', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set lotSize = :lotSize',
    ExpressionAttributeValues: {
      ':lotSize': req.body.lotSize
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// COE
app.put('/properties/:id/coe', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set coe = :coe',
    ExpressionAttributeValues: {
      ':coe': req.body.coe
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// COE
app.put('/properties/:id/date', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set date = :date',
    ExpressionAttributeValues: {
      ':date': req.body.date
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Deal Split
app.put('/properties/:id/dealsplit', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set dealSplit = :dealSplit',
    ExpressionAttributeValues: {
      ':dealSplit': req.body.dealSplit
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

// Access Type
app.put('/properties/:id/typeaccess', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set typeAccess = :typeAccess',
    ExpressionAttributeValues: {
      ':typeAccess': req.body.typeAccess
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });

});

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

// Acq Drop
app.put('/properties/:id/acqgp', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set acqGP = :acqGP',
    ExpressionAttributeValues: {
      ':acqGP': req.body.acqGP
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

// Acq Name
app.put('/properties/:id/name', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set name = :name',
    ExpressionAttributeValues: {
      ':name': req.body.name
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Acq Name
app.put('/properties/:id/acqname', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set acqName = :acqName',
    ExpressionAttributeValues: {
      ':acqName': req.body.acqName
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
    UpdateExpression: 'set signersName = :signersName',
    ExpressionAttributeValues: {
      ':signersName': req.body.signersName
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Phone
app.put('/properties/:id/buyerphone', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerPhone = :buyerPhone',
    ExpressionAttributeValues: {
      ':buyerPhone': req.body.buyerPhone
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Buyer Phone
app.put('/properties/:id/buyeremail', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set buyerEmail = :buyerEmail',
    ExpressionAttributeValues: {
      ':buyerEmail': req.body.buyerEmail
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

// Completion Date2
app.put('/properties/:id/completiondate2', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':completionDate2': req.body.completionDate2
    },
    UpdateExpression: 'set completionDate2 = :completionDate2',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Dispo Final
app.put('/properties/:id/dispofinal', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':dispoFinal': req.body.dispoFinal
    },
    UpdateExpression: 'set dispoFinal = :dispoFinal',
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

// Title Company
app.put('/properties/:id/titlecompany', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set titlecompany = :titlecompany',
    ExpressionAttributeValues: {
      ':titlecompany': req.body.titlecompany
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Escrow Phone
app.put('/properties/:id/escrowphone', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set escrowPhone = :escrowPhone',
    ExpressionAttributeValues: {
      ':escrowPhone': req.body.escrowPhone
    },
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Escrow Email
app.put('/properties/:id/escrowemail', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    UpdateExpression: 'set escrowEmail = :escrowEmail',
    ExpressionAttributeValues: {
      ':escrowEmail': req.body.escrowEmail
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

// Pricing Date
app.put('/properties/:id/picturelink', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':pictureLink': req.body.pictureLink
    },
    UpdateExpression: 'set pictureLink = :pictureLink',
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

// Pricing Date
app.put('/properties/:id/propPhoto', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':propPhoto': req.body.propPhoto
    },
    UpdateExpression: 'set propPhoto = :propPhoto',
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
app.put('/properties/:id/propstatus', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':propStatus': req.body.propStatus
    },
    UpdateExpression: 'set propStatus = :propStatus',
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

// Supplier's Name
app.put('/properties/:id/suppliername', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':supplierName': req.body.supplierName
    },
    UpdateExpression: 'set supplierName = :supplierName',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Supplier's Phone
app.put('/properties/:id/supplierphone', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':supplierPhone': req.body.supplierPhone
    },
    UpdateExpression: 'set supplierPhone = :supplierPhone',
    ReturnValues: 'ALL_NEW'
  }
  
    docClient.update(params, (err, data) => {
      if (err) res.json({ err })
      else res.json({ success: data })
    });
});

// Supplier's Email
app.put('/properties/:id/supplieremail', function (req, res) {

  let params = {
    TableName: 'inventory-dev',
    Key: {
      id: req.body.id,
    },
    ExpressionAttributeValues: {
      ':supplierEmail': req.body.supplierEmail
    },
    UpdateExpression: 'set supplierEmail = :supplierEmail',
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

app.delete('/inventory/:id', function(req, res) {
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

app.delete('/inventory/:id/files/:fileid', function(req, res) {
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
