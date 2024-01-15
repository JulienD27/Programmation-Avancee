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
        <SectionContainer>
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2>MON COMPTE</h2>
                {userDetails ? (
                    <>
                        <br></br>
                        <p>Bonjour, {userDetails.user_metadata.name} !</p>
                        <br></br>
                        <p><span className="font-bold">Nom :</span> {userDetails.user_metadata.name}</p>
                        <p><span className="font-bold">Email :</span> {userDetails.email}</p>
                        <br></br>
                    </>
                ) : (
                    <p>Chargement des détails de l'utilisateur...</p>
                )}
                <Button onClick={handleLogout}>Se déconnecter</Button>
            </div>
        </SectionContainer>
    );
};