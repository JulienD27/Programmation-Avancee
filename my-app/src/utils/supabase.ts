import { SupabaseClient, User } from '@supabase/supabase-js';

export const getUser = async (supabase: SupabaseClient): Promise<User | null> => {
    return ( await supabase.auth.getSession()).data?.session?.user ?? null;
};