"""
client_schema_main.py - A script to execute some commands demonstrating MongoDB's client-side field-level encryption.
Note:
-----
Before running this script, first run "client_schema_create_key.py" to
configure a key in the database and to generate "key_bytes.bin"
and "json_schema.json".
"""

import os
from pathlib import Path

from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.errors import EncryptionError
from bson import json_util
from client_schema_create_key import get_connection_string


# Load the secret key from 'key_bytes.bin':
key_bin = Path("key_bytes.bin").read_bytes()

# Load the 'person' schema from "json_schema.json":
collection_schema = json_util.loads(Path("json_schema.json").read_text())

# Configure a single, local KMS provider, with the saved key:
kms_providers = {"local": {"key": key_bin}}

# Create a configuration for PyMongo, specifying the local key,
# the collection used for storing key data, and the json schema specifying
# field encryption:
fle_opts = AutoEncryptionOpts(
    kms_providers,
    "fle_demo.__keystore",
    schema_map={"Leafsaver.UserProfileEncrypted": collection_schema},
)

# Add new documents to the "UserProfileEncrypted" collection, and then read it back out
# to demonstrate that the MedicalProfileID, DOB, and InsurancePolicyID fields are automatically decrypted by PyMongo:
with MongoClient(get_connection_string(), auto_encryption_opts=fle_opts) as client:
    #client.Leafsaver.UserProfileEncrypted.delete_many({})
    client.Leafsaver.UserProfileEncrypted.insert_one(
        {
            "FirstName": "Bertie",
            "LastName": "Valentini",
            "email": "gilcum@ocufu.as",
            "MedicalRecordId": "3D@v[(p$1@2naqO(",
            "AccountId": "wX%%%ic6N%6IwD[n",
            "DOB": "1990/01/01",
            "Phone": "+16246922898",
            "address": {
                "number": 4703,
                "street": "Imamu Turnpike",
                "city": "Otmuof",
                "state": "CT",
                "zip": "24026",
                "location": {
                    "type": "Point",
                    "coordinates": [-72.03626,40.02663]
                }
            },
            "Insurance": {
                "ProviderName": "MEDICARE",
                "PolicyId": "f#%4PW8N$e"
            },
            "Devices": {
                "DeviceId": "Glucose1234"
            },
            "UserId": "61780e2968f275f84ec66f2c"
        }
    )

    client.Leafsaver.UserProfileEncrypted.insert_one(
        {
            "FirstName": "Blanche",
            "LastName": "Verheul",
            "email":"fiskatgid@vi.dj", 
            "MedicalRecordId": "^%CelIYOmGo%uYp5",
            "AccountId": "dSJkV$hnDf1i$6GS",
            "DOB": "1985/10/26",
            "Phone": "+16244193449",
            "address": {
                "number": 5307,
                "street": "Fubpu Square",
                "city": "Akbukil",
                "state": "OK",
                "zip": "00548",
                "location": {
                    "type": "Point",
                    "coordinates": [-74.30605,42.19567]
                }
            },
            "Insurance": {
                "ProviderName": "AETNA",
                "PolicyId": "%Ugg*#jp[["
            },
            "Devices": {
                "DeviceId": "Heart1234"
            },
            "UserId": "61780e1d059bdc5f0e0f810e"
        }
    )
    client.Leafsaver.UserProfileEncrypted.insert_one(
        {
            "FirstName": "Mamie",
            "LastName": "Da SilvaSilva",
            "email": "jeegar@example.com",
            "MedicalRecordId": "ILIqceSPu!MBjD)@",
            "AccountId":"TKp#uofmiIvoih2A", 
            "DOB":"1992/03/01", 
            "Phone":"+14164357793", 
            "address": {
                "number": 1077,
                "street": "Dubaz Avenue",
                "city": "Pemhotno",
                "state": "WA",
                "zip": "38920",
                "location": {
                    "type": "Point",
                    "coordinates": [-74.91613,41.87306]
                }
            },
            "Insurance": {
                "ProviderName": "MEDICARE",
                "PolicyId": "7aRcz9DDa1"
            },
            "Devices": {
                "DeviceId": "RoomTemp1234"
            },
            "UserId": "61780e45bc9c376267053a6c"
        }
    )

    decryptedResults = client['Leafsaver']['UserProfileEncrypted'].aggregate([
    {
        '$match': {
            'MedicalRecordId': {
                '$exists': True
            }
        }
    }, {
        '$limit': 5
    }
    ])

    print("Decrypted find() results: ")
    print("==========================")
    for result in decryptedResults:
        print(result)
    

# Connect to MongoDB, but this time without FLE configuration.
# This will print the document with fields *still encrypted*:
with MongoClient(get_connection_string()) as client:

    encryptedResults = client['Leafsaver']['UserProfileEncrypted'].aggregate([
    {
        '$match': {
            'MedicalRecordId': {
                '$exists': True
            }
        }
    }, {
        '$limit': 5
    }
    ])

    print("\n\nEncrypted find() results: ")
    print("==========================")
    for result in encryptedResults:
        print(result)