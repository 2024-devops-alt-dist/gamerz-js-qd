if(!process.env.JWT_SECRET_KEY){
    throw new Error("Secret key non trouvée");
}
export const SECRET_KEY = process.env.JWT_SECRET_KEY;