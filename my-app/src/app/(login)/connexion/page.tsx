"use client";
import React, {useCallback, useEffect, useState} from 'react';
import {useForm, zodResolver} from '@mantine/form';
import {z} from 'zod';
import {TextInput, PasswordInput, Box} from '@mantine/core';
import {Button, NoticeMessage, NoticeMessageData} from 'tp-kit/components';
import {ProductFiltersResult} from "../../../types";
import {variant} from "@mantine/styles/lib/theme/functions/fns/variant/variant";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {getUser} from "../../../utils/supabase";

const schema = z.object({
    email: z.string().email({message: 'L\'email doit être au format valide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit faire au moins 6 caractères'}),
});


const Connexion = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    function addError() {
        setNotices(n => [...n, {type: "error", message: "Erreur de connexion"}]);
    }

    function addSuccess() {
        setNotices(n => [...n, {type: "success", message: "Connexion réussi"}]);
    }

    function removeNotice(index) {
        setNotices(n => {
            delete (n[index]);
            return Object.values(n);
        });
    }

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSignIn = async () => {
        const connect = await supabase.auth.signInWithPassword({
            email: form.values.email,
            password: form.values.password,
        });

        if (connect.error === null) {
            router.refresh();
            router.push("/mon-compte");
        } else {
            setNotices(n => [...n, {type: "error", message: "Erreur de connexion"}])
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const user = await getUser(supabase)
            if (user) {
                router.refresh();
                router.push("/");
            }
        }
        checkUser();
    });

    return (
        <Box maw={340} mx="auto">
            <ul>
                {notices.map((notice, i) => <NoticeMessage
                    key={i}
                    {...notice}
                    onDismiss={() => removeNotice(i)}
                />)}
            </ul>
            <form onSubmit={form.onSubmit(handleSignIn)} className="space-y-8 mt-16">
                <TextInput
                    withAsterisk
                    label="Adresse email"
                    placeholder="lin.guini@barilla.it..."
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    withAsterisk
                    label="Mot de passe"
                    placeholder="Ke$$a..."
                    {...form.getInputProps('password')}
                />
                <div>
                    <Button type="submit" fullWidth>
                        Se connecter
                    </Button>
                    <Button type="button" fullWidth variant="ghost" onClick={() => {
                        router.push("/inscription");
                    }}>
                        Créer un compte
                    </Button>
                </div>
            </form>
        </Box>
    );
};

export default Connexion;