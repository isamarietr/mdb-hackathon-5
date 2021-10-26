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
