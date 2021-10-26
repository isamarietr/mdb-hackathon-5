# Leafsavers

https://docs.google.com/presentation/d/1H4jW3Hd92DzcFEI2yN9HRIBIjqsF4anjp99cZIWg_KU/edit?usp=sharing

## Initial Setup

Clone the repository before continuing. 

### User Profiles and Encrypted Schema

#### Prerequisites
* Python 3.6+ (preferrably Python 3.8 or later)
* MongoDB Atlas cluster running MongoDB 4.2 or later
* The PyMongo driver with pymongocrypt, installed via `python3 -m pip install "pymongo[encryption,srv]~=3.11`
* [mongocryptd](https://docs.mongodb.com/manual/reference/security-client-side-encryption-appendix/#mongocryptd-installation)
* [Twilio](https://www.twilio.com) - Sign up and create ACCOUNT SID and AUTH TOKEN. You will also need to request a phone number to send the text messages from. Free trial gives you $15 credits.

#### Instructions
To load the initial user profiles as well as establish the schema for Client Side Field Level Encryption, perform the following steps:

1. In the cloned repo, navigate to the `scripts` directory.
2. Create a file called `connection-string.txt` and paste your MongoDB Atlas connection string inside. 
3. Run the `client_schema_create_key.py` script to establish the local master key and create the JSON schema for the User Profile collection.
4. Run the `client_schema_main.py` script to create the initial three user profiles and test to see that they only return decrypted results when using an encrypted session established by the driver.


### Web App

#### Prerequisites
* Stand up a Realm Application and copy its Realm App ID. 

#### Instructions
1. Create a `.env` file in the following format:

    ```
    MDB_URI="mongodb+srv://dbuser:dbpassword@leafie.lkxsd.mongodb.net/test"
    DB_NAME="Leafsaver"
    COLLECTION_NAME="Lifestyle"
    INDEX_NAME="default"
    INDEX_FIELD="*"
    REALM_APP_ID="[YOUR-REALM-APP-ID]"
    ```

### Charts Setup

1. Log onto MongoDB Charts

2. Go to Data Sources and click 'Add Data Source' and add the `Leafsaver.IoT_TS_Data` collection

3. Click the 'Add Pipeline' button next to `Leafsaver.IoT_TS_Data`

4. Add the following Aggregation Pipeline and click 'Save':
```
[
   {$setWindowFields: {
         partitionBy: { DeviceID : "$meta.DeviceID" },
         sortBy: { DeviceDate: 1 },
         output: {
            movingAverage: {
                $avg : "$value",
               window : { "documents" : [-10, 0] }
            } } 
   } }
]
```

4. Create a new Dashboard by clicking 'Add Dashboard' and call it whatever you like

5. You need to add 3 Charts using using the `Leafsaver.IoT_TS_Data` Data Source.
   i) Add a chart for the <strong>Glucose Monitor</strong>

   X Axis: `DeviceDate`<br>
   Y Axis: `value`<br>
   Y Axis: `movingAverage`<br>
   ![chartEncode](img/glucose1.png)

   Filter: `DeviceType` and Check ONLY `Glucose Monitor`
   ![chartFilter](img/glucose2.png)

   ii) Add a chart for the <strong>Room Temperature Monitor</strong>

   X Axis: `DeviceDate`<br>
   Y Axis: `value`<br>
   Y Axis: `movingAverage`<br>
   Filter: `DeviceType` and Check ONLY `Room Temperature Monitor`

6. Enable Embedding for each chart, enable unauthenticated access, and for "User specified filters" add the `meta.UserId`. For each chart get the `Charts Base URL` and Chart ID
 ![chartEmbed](img/chartEmbed.png)



