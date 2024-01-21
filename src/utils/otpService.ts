import { MongoClient } from 'mongodb';

const getOtpRecordFromDatabaseOrSession = async (phone) => {
    const uri = 'your-mongodb-connection-string';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db('your-database-name');
        const otpsCollection = database.collection('otps');

        const otpRecord = await otpsCollection.findOne({ phone });

        return otpRecord;
    } finally {
        await client.close();
    }
};

export { getOtpRecordFromDatabaseOrSession };
