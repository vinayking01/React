// Storage service / Bucket Service file 

import conf from "../Config/conf"

import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    Databases;
    bucket;
    constructor() {
        this.client
        .setEndpoint(conf.VITE_React_APP_APPWRITE_URL) // Your API Endpoint
        .setProject(conf.VITE_APPWRITE_PROJECT_ID);
        
        this.Databases =  new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    // Creating post 
    async createPost({title, slug,content,featuredImage,status,userId}){
        try{
            return await this.Databases.createDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.appwriteCollectionId,
                slug,   // here we considered that slug as unique id
                {
                    title : title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        }catch(err)
        {
            console.log(err)
        }
    }

    // update Document
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.Databases.updateDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.appwriteCollectionId,
                slug,
                {
                    title : title,
                    content,
                    featuredImage,
                    status
                },

            )
        }catch(err)
        {
            console.log(err)
        }
    }

    // Delete Post
    async deletePost(slug)
    {
        try{
           await this.Databases.deleteDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.appwriteCollectionId,
                slug,
            )
            return "deleted Successfully"
        }catch(err)
        {
            console.log(err)
            return false;
        }
    }

    // Get Post
    async getPost(slug)
    {
        try{
           return await this.Databases.getDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.appwriteCollectionId,
                slug,
            )
        }catch(err)
        {
            console.log(err)
            return false;
        }
    }

    // Get All Post 
    async getPosts(queries = [Query.equal("status","active")])   // passing query by default for this set up the status in indexes in AppWrite website
    {
        try{
           return await this.Databases.listDocuments(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.appwriteCollectionId,
                queries    // this is optional to give query  - this is like condition to get the data 
            )
        }catch(err)
        {
            console.log(err)
            return false;
        }
    }

    // file upload service 
    async uploadFile(file)
    {
        try{
            return await this.bucket.createFile(
                 conf.appwriteBucketId,
                 ID.unique(),
                 file 
             )
         }catch(err)
         {
            console.log(err)
         }
    }

    // Delete file
    async deleteFile(fileID)
    {
        try{
            return await this.bucket.deleteFile(
                 conf.appwriteBucketId,
                 fileID

             )
         }catch(err)
         {
            console.log(err)
         }
    }

    // Preview file
    previewFile(fileID)
    {
        try{
            return this.bucket.getFilePreview(
                 conf.appwriteBucketId,
                 fileID

             )
         }catch(err)
         {
            console.log(err)
         }
    }
  


}


const service = new Service();

export default service;