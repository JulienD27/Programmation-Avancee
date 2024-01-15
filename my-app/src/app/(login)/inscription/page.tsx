"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Button, NoticeMessage, NoticeMessageData, SectionContainer} from "tp-kit/components";
import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {PasswordInput, TextInput, Box, Group} from '@mantine/core';
import Layout from "../Layout";
import React, {useEffect, useState} from "react";
import { createClient } from '@supabase/supabase-js'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import {getUser} from "../../../utils/supabase";

const schema = z.object({
    name: z.string().min(2, {message: 'Le nom ne doit pas être vide'}),
    email: z.string().email({message: 'Format invalide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
});

type FormValues = z.infer<typeof schema>;

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

    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        validate: zodResolver(schema),
    });

    const [created, setCreated] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignUp = async (values: FormValues) => {
        console.log(values);
        const { error } = await supabase.auth.signUp(
            {
                email: values.email,
                password: values.password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/api/auth/callback',
                    data: {
                        name: values.name
                    }
                }
            }
        )

        console.log(error)
        setCreated(true);
        addSuccess();
        setMessage((error) ? error.message : "Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter")
        setIsValid((!error))
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
                                    router.push("/connexion");
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