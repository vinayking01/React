import { Client, Account, Databases} from 'appwrite';
import conf from '../conf';

export const client = new Client();

client
    .setEndpoint(conf.appwriteEndpoint)
    .setProject(conf.appwriteprojectid); // Replace with your project ID

export const account = new Account(client);

//Database

export const databases = new Databases(client, conf.appwritedatabaseid)

export { ID } from 'appwrite';
