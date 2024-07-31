import { NextResponse } from "next/server";
import cipher from "../../../data/dailyCipher.json";


export async function GET() {
    return NextResponse.json({ cipher });
}