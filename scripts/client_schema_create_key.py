"""
client_schema_create_key.py - A Python script to create a random key.
This script:
 * Generates a random 96-byte key, and writes it to "key_bytes.bin"
 * Connects to the MongoDB server at "MDB_URL" and adds a key to "fle_demo.__keystore", with the alt name of "example".
 * Writes a schema for the fle_demo.people colleciton to "json_schema.json".
"""

import os
from pathlib import Path
from secrets import token_bytes

from bson import json_util
from bson.binary import STANDARD
from bson.codec_options import CodecOptions
from pymongo import MongoClient
from pymongo.encryption import ClientEncryption
from pymongo.encryption_options import AutoEncryptionOpts


# Generate a secure 96-byte secret key:
key_bytes = token_bytes(96)

# Configure a single, local KMS provider, with the saved key:
kms_providers = {"local": {"key": key_bytes}}
fle_opts = AutoEncryptionOpts(
    kms_providers=kms_providers, key_vault_namespace="fle_demo.__keystore"
)

def get_connection_string(path="./connection-string.txt"):
    with open(path, "r") as f:
        return f.read(100)

# Connect to MongoDB with the key information generated above:
#
# Uncomment if you would prefer to use environment variable for connection string
# with MongoClient(os.environ["MDB_URL"], auto_encryption_opts=fle_opts) as client:
with MongoClient(get_connection_string(), auto_encryption_opts=fle_opts) as client:

    # Create a ClientEncryption object to create the data key below:
    client_encryption = ClientEncryption(
        kms_providers,
        "fle_demo.__keystore",
        client,
        CodecOptions(uuid_representation=STANDARD),
    )

    print("Creating key in MongoDB ...")
    MedicalRecordIdKey_id = client_encryption.create_data_key("local", key_alt_names=["medicalrecordid"])
    DOBKey_id = client_encryption.create_data_key("local", key_alt_names=["dob"])
    InsurancePolicyIdKey_id = client_encryption.create_data_key("local", key_alt_names=["insurancepolicyid"])

    # This is the schema which will be saved out to "json_schema.json":
    schema = {
        "bsonType": "object",
        "properties": {
            "FirstName": {
                "bsonType": "string"
            },
            "LastName": {
                "bsonType": "string"
            },
            "email": {
                "bsonType": "string"
            },
            "MedicalRecordId": {
                "encrypt": {
                    "bsonType": "string",
                    "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                    "keyId": [MedicalRecordIdKey_id]
                }
            },
            "AccountId": {
                "bsonType": "string"
            },
            "DOB": {
                "encrypt": {
                    "bsonType": "string",
                    "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                    "keyId": [DOBKey_id]
                }
            },
            "Phone": {
                "bsonType": "string"
            },
            "address": {
                "bsonType": "object",
                "properties": {
                    "number": {
                        "bsonType": "string"
                    },
                    "street": {
                        "bsonType": "string"
                    },
                    "city": {
                        "bsonType": "string",
                    },
                    "state": {
                        "bsonType": "string",
                    },
                    "zip": {
                        "bsonType": "string"
                    },
                    "location": {
                        "bsonType": "object",
                        "properties": {
                            "type": {
                                "bsonType": "string"
                            },
                            "coordinates": {
                                "bsonType": "array"
                            }
                        }
                    }
                }
            },
            "Insurance": {
                "bsonType": "object",
                "properties": {
                    "ProviderName": {
                        "bsonType": "string"
                    },
                    "PolicyId": {
                        "encrypt": {
                            "bsonType": "string",
                            "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                            "keyId": [InsurancePolicyIdKey_id]
                        }
                    }
                }
            },
            "Devices": {
                "bsonType": "object",
                "properties": {
                    "DeviceId": {
                        "bsonType": "string"
                    }
                }
            },
            "UserId": {
                "bsonType": "string"
            }
        },
    }

    print("Writing secret key to 'key_bytes.bin' ...")
    Path("key_bytes.bin").write_bytes(key_bytes)

    print("Writing schema to 'json_schema.json' ...")
    json_schema = json_util.dumps(
        schema, json_options=json_util.CANONICAL_JSON_OPTIONS, indent=2
    )
    Path("json_schema.json").write_text(json_schema)

    print("Done.")