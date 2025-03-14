if(!process.env.JWT_SECRET_KEY){
    throw new Error("Secret key non trouvée");
}
const SECRET_KEY = process.env.JWT_SECRET_KEY;