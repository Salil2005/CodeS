import {StreamChat} from 'stream-chat';
import {ENV} from './env.js'; 

const apiKey = ENV.KEYSTREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("KEYSTREAM_API_KEY or STREAM_API_SECRET is missing in the environment variables");
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);


export const upsertStreamUser = async(userData) => {
    try{
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully :" , userData);
        
    } catch (error) {
        console.log("Error upserting user to Stream Chat:", error);
        throw error;
        
    }
}

export const deleteStreamUser = async(userData) => {
    try{
        await streamClient.deleteUser(userData.id);
        console.log("User deleted successfully " , userData.id);
        
    } catch (error) {
        console.log("Error deleting user from Stream Chat:", error);
        
    }
}

