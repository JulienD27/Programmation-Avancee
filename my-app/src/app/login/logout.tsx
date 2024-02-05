"use client";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Button} from "@mantine/core";
import {useRouter} from "next/navigation";

export default function Logout() {
    const supabase = createClientComponentClient()
    const router = useRouter()
    return (
        <Button
            onClick={() => {
                supabase.auth.signOut().then(() => {
                    router.refresh()
                })
            }}
            variant="outline" className="w-full mt-4">
            Se déconnecter
        </Button>
    )
}