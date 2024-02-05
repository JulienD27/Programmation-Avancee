import React, {PropsWithChildren} from 'react';
import {getUser} from "../../utils/supabase";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Layout({children}: PropsWithChildren) {
    const supabase = createServerComponentClient({cookies})
    const user = await getUser(supabase);
    console.log(user)
    if (user) {
        redirect('/mon-compte');
    }

    return <>
        {children}
    </>
};
