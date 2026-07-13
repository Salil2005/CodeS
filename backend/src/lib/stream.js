import {StreamChat} from 'stream-chat';
import {ENV} from './env.js'; 

const apiKey = ENV.KEYSTREAM_API_;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.log("KEYSTREAM_API_ or STREAM_API_SECRET is missing in the environment variables");
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);


export const upsertStreamUser = async(userData) => {
    try{
        await streamClient.upsertUser(userData);
        console.log("Stream user upserteed successfully :" , userData);
        
    } catch (error) {
        console.log("Error upserting user to Stream Chat:", error);
        
    }
}

export const deleteStreamUser = async(userData) => {
    try{
        await streamClient.deleteUser(userId);
        console.log("User deleted successfully " , userId);
        
    } catch (error) {
        console.log("Error deleting user from Stream Chat:", error);
        
    }
}

