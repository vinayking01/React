const conf  = {
    appwriteEndpoint : String(import.meta.env.VITE_React_APP_APPWRITE_ENDPOINT_URL),
    appwritedatabaseid :  String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionid : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteprojectid : String(import.meta.env.VITE_APPWRITE_PROJECT_ID)
}

export default conf;