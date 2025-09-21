import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";

/*
Disclaimer:
You really don't want to mess with this unless you know what you are doing.
Please don't use AI to edit this as it's a major security issue.
Please refer back to the guide for more information.
*/

const database = postgres(process.env.POSTGRES_URL!, {ssl: "require"});
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);


const MAX_DAYS = 6.6;
const MIN_DAYS = 1.25;

const refreshDatabase = async () => {
    await database`SELECT COUNT(*) FROM blog`;
    setTimeout(()=>{
        refreshDatabase();
    }, (Math.random() * (MAX_DAYS-MIN_DAYS))+MIN_DAYS);
}

refreshDatabase();



export { database, supabase }