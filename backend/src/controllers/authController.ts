if(!process.env.JWT_SECRET_KEY){
    throw new Error("Secret key non trouvée");
}

if (!process.env.JWT_REFRESH_SECRET_KEY) {
    throw new Error("Refresh Secret key non trouvée");
}

export const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;