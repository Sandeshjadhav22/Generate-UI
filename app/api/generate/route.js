import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextResponse } from "next/server";

export async function  POST(res,req) {
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    try {
        const model = genAi.getGenerativeModel({model : "gemini-pro"})

        const data = await req.json();
        const prompt = data.body + "Write jsx code and use tailwindcss for modern UI. Don't make any imports. Only output code.";

        const result = await model.generateContent(prompt);
        const code = await result.response.text();

        return NextResponse.json({code:code})

    } catch (error) {
        console.log(error);
    }
}