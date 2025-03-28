import { createClient } from "redis";

export const newClient = async () => {
    const client = createClient(
        {
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT!)
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