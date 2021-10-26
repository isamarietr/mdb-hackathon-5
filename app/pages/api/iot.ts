import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { ExtendedRequest } from '../../interfaces/server';
import middleware from '../../middleware/database';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();
handler.use(middleware);

handler.get(async (req, res) => {

  const { DeviceId, limit, userId } = req.query;
  const { db } = req.mongodb;

  const limitValue = Number.parseInt(limit as string)

  const searchStage = 
    [
      {
        '$match': {
          'meta.UserId':  userId
        }
      }
    ]


  const skipLimitStage = [
    {
      '$sort': {
        'DeviceDate': -1
      }
    },
    // {
    //   "$skip": pageValue * limitValue
    // },
    {
      "$limit": limitValue
    }
  ]

  console.log([...searchStage, ...skipLimitStage]);

  const countStage = { $count: 'total' }
  try {
    // let totalMatches = 0
    // try {
    //   let { total } = await db.collection['IoT_Data'].aggregate([searchStage, countStage]).next()
    //   totalMatches = total
    // } catch (error) {
    //   console.log(`Did not return total from pipeline. Setting total to 0.`);

    // }

    let result = await db.collection('IoT_Data').aggregate([...searchStage, ...skipLimitStage]).toArray();
    // let result = await db.collection('IoT_Data').find({}).toArray();
    // let result = await db.collection['IoT_Data'].aggregate([searchStage, ...skipLimitStage]).toArray();
    return res.send({ result });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default handler;