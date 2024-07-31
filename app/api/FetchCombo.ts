import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import * as fs from "fs";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'data', 'dailyCombo.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading daily combo file" });
        }
        res.status(200).json(JSON.parse(data));
    });
}