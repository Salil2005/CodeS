import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { upsertStreamUser } from "./stream.js";


export const inngest = new Inngest({ id : "CodeS"})

const syncUser = inngest.createFunction(
    { id: "sync-user", name: "Sync User", triggers: [{ event: "clerk/user.created" }] },
    async ({ event }) => {
        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url || "",
        }

        await User.create(newUser)

        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            email: newUser.email,
            image: newUser.profileImage,
        });
    }
)

const deleteUser = inngest.createFunction(
    { id: "delete-user", name: "Delete User", triggers: [{ event: "clerk/user.deleted" }] },
    async ({ event }) => {
        await connectDB();

        const{id} = event.data

        await User.deleteOne({ clerkId: id })

        await deleteStreamUser({
            id: id.toString(),
        });
    }
)

export const functions = [syncUser, deleteUser]