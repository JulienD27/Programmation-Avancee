import {getUser} from "../../utils/supabase";
import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/gotrue-js/src/lib/types"
import {Button, SectionContainer} from "tp-kit/components";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Logout from "../login/logout";

export default async function Page() {
    const supabase = createServerComponentClient({cookies});
    const user = await getUser(supabase);
    if (!user) {
        redirect('login/connexion');
    }

    return (
        <SectionContainer>
            <div className="bg-white rounded-lg p-4 shadow-lg">
                <p className="text-2xl my-3">
                    MON COMPTE
                </p>
                <p className="my-4">
                    Bonjour, {user.user_metadata.name} !
                </p>
                <div className="my-4">
                    <p>
                        Nom : {user.user_metadata.name}
                    </p>
                    <p>
                        Email : {user.email}
                    </p>
                </div>

                <Logout />
            </div>
        </SectionContainer>
    )
}