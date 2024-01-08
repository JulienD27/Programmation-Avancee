"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, SectionContainer } from 'tp-kit/components';
import { getUser } from '../../utils/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Page() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const user = await getUser(supabase);
            if (!user) {
                router.push('/connexion');
            } else {
                setUserDetails(user);
                console.log(user)
            }
        }

        fetchData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div>
            {userDetails && (
                <SectionContainer>
                    <h3>Bonjour Monsieur {userDetails.user_metadata.name}</h3>
                    <Button onClick={handleLogout}>Se déconnecter</Button>
                </SectionContainer>
            )}
        </div>
    );
};