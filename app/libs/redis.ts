import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "~/constants";

export const newClient = async () => {
    const client = createClient(
        {
            socket: {
                host: REDIS_HOST,
                port: parseInt(REDIS_PORT)
            }
        }
    )

    client.on('error', err => {
        console.error('Redis client error: ', err)
    })
    
    try {
        await client.connect()   
    } catch (err) {
        
    }
    
    return client
}