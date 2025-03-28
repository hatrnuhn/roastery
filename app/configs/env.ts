export const checkEnv = (): void => {
    const {
        SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET,
        SPOTIFY_API_URL,
        SPOTIFY_AUTH_URL,
        GEMINI_API_KEY,
        REDIS_HOST,
        REDIS_PORT
    } = process.env;

    const baseMsg = 'Missing env variable: ';
    const missingEnvVarErrorMsgs: string[] = [];

    if (!SPOTIFY_CLIENT_ID)
        missingEnvVarErrorMsgs.push(baseMsg + 'SPOTIFY_CLIENT_ID');
    if (!SPOTIFY_CLIENT_SECRET)
        missingEnvVarErrorMsgs.push(baseMsg + 'SPOTIFY_CLIENT_SECRET');
    if (!SPOTIFY_API_URL)
        missingEnvVarErrorMsgs.push(baseMsg + 'SPOTIFY_API_URL');
    if (!SPOTIFY_AUTH_URL)
        missingEnvVarErrorMsgs.push(baseMsg + 'SPOTIFY_AUTH_URL');
    if (!GEMINI_API_KEY)
        missingEnvVarErrorMsgs.push(baseMsg + 'GEMINI_API_KEY');
    if (!REDIS_HOST)
        missingEnvVarErrorMsgs.push(baseMsg + 'REDIS_HOST');
    if (!REDIS_PORT)
        missingEnvVarErrorMsgs.push(baseMsg + 'REDIS_PORT')

    if (missingEnvVarErrorMsgs.length > 0) {
        throw new Error(missingEnvVarErrorMsgs.join('\n'));
    }
};