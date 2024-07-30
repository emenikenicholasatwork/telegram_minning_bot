import path from "path";
import * as fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'data', 'dailyCipher.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading daily cipher file" });
        }
        res.status(200).json(JSON.parse(data));
    });
}