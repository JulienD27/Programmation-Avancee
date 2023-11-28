"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, NoticeMessage, NoticeMessageData, SectionContainer} from "tp-kit/components";
import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {PasswordInput, TextInput, Box, Group} from '@mantine/core';
import Layout from "../Layout";
import React, {useState} from "react";
import { createClient } from '@supabase/supabase-js'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";



const schema = z.object({
    name: z.string().min(2, {message: 'Le nom ne doit pas être vide'}),
    email: z.string().email({message: 'Format invalide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
});


const Inscription = () => {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const [notices, setNotices] = useState<NoticeMessageData[]>([]);

    function addError(mes: string) {
        setNotices(n => [...n, {type: "error", message: mes}]);
    }

    function addSuccess() {
        setNotices(n => [...n, {type: "success", message: "Inscription réussi"}]);
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
            name: '',
            email: '',
            password: '',
        },
    });

    const handleSignUp = async () => {
        try {
            const res = await supabase.auth.signUp({
                email: form.values.email,
                password: form.values.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });
            const error = res.error;
            console.log(res);
            if (error) {
                addError(res.error.message);
                console.log('Erreur lors de l\'inscription : ', error)
            } else {
                addSuccess();
                console.log('Inscription réussi')
                //router.refresh();
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription : ', error);
            addError(error.message);
        }
    };

    return (
        <Layout>
            <Box maw={340} mx="auto">
                <ul>
                    {notices.map((notice, i) => <NoticeMessage
                        key={i}
                        {...notice}
                        onDismiss={() => removeNotice(i)}
                    />)}
                </ul>
                <form onSubmit={form.onSubmit(handleSignUp)}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        description="Le nom qui sera utilisé pour vos commandes"
                        placeholder="Michel"
                        mt="sm"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="example@mail.com"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder={"Ke$$a..."}
                        {...form.getInputProps('password')}
                    />
                    <div>
                        <Button type="submit" fullWidth>
                            S'inscrire
                        </Button>
                        <Button variant={"outline"} fullWidth variant="ghost"
                                onClick={() => {
                                    window.location.href = "/connexion"
                                }}>
                            Déjà un compte ? Se connecter
                        </Button>
                    </div>
                </form>
            </Box>
        </Layout>
    );
}

export default Inscription;