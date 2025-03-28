import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { safetySettings } from "~/configs/gemini";
import { MODEL } from "~/constants";

export class GeminiLibrary {
    private model: GenerativeModel

    constructor(apiKey: string, model: string) {
        this.model = this.createModel(apiKey, model)
    }

    private createModel(apiKey: string, model: string) {
        return new GoogleGenerativeAI(apiKey).getGenerativeModel({ model, safetySettings })
    }

    public async generateText(prompt: string) {
        const { response } = await this.model.generateContent(prompt)
        if (response.candidates && response.candidates.length >= 1 && response.candidates[0].content.parts[0].text)
            return response.candidates[0].content.parts[0].text
        else 
            throw new Error('No candidate in result')
    }
}

export default new GeminiLibrary(process.env.GEMINI_API_KEY!, MODEL)