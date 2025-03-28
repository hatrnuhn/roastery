import type { Roast } from "~/types";
import { compressString, decompressString } from "./compression";

class History {
    public async get() {
        const data = localStorage.getItem('data')
        if (data) {
            const decompressed = await decompressString(data)
            return JSON.parse(decompressed) as Roast[]
        }
        
        return null
    }

    public get size() {
        const data = localStorage.getItem('data')
        if (data)
            return new Blob([data]).size
    }

    public async set(roasts: Roast[]) {
        const compressed = await compressString(JSON.stringify(roasts))
        localStorage.setItem('data', compressed)
    }
}

export default new History()