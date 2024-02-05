import { SupabaseClient, User } from '@supabase/supabase-js';

export async function getUser (supabase: SupabaseClient) : Promise<User | null>  {
    const { data, error } = await supabase.auth.getUser()
    return data.user
}
