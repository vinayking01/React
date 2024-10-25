//  this is the 'conf' file created for the reason because if sometimes the file doesn't load the changes in env files.It can cause application crash and hard to find the bug. Apart from this we are also making sure that value is always considered to be string because environment variable should be in string.

const conf =  {
    appwriteUrl: String(import.meta.env.VITE_React_APP_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteeDatabaseUrl  : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    EditorApiKey : String(import.meta.env.VITE_TINYEDITOR_API_KEY)
}

export default conf