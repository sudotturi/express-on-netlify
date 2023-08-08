// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from 'express';
import serverless from 'serverless-http';
import { MongoClient } from "mongodb";
const api = express();

const router = Router();
router.get("/test", async (req, res) => {

    const connectionString = process.env.ATLAS_URI || "";

    const client = new MongoClient(connectionString);

    let conn;
    try {
        conn = await client.connect();
    } catch (e) {
        console.error(e);
    }

    let db = conn.db("sudo");

    let collection = await db.collection("test");
    let results = await collection.find({})
        .limit(50)
        .toArray();

    res.send(results).status(200);
});

router.get('/hello', (req, res) => res.send('Hello World!'));
router.get('/hello1', (req, res) => res.send('Hello World1!'));
router.get('/hello2', (req, res) => res.send('Hello World2!'));
router.get('/hello3', (req, res) => res.send('Hello World3!'));
router.get('/hello4', (req, res) => res.send('Hello World4!'));

api.use('/api/', router);

export const handler = serverless(api);
