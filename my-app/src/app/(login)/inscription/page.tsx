"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {SectionContainer} from "tp-kit/components";
import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {PasswordInput, TextInput, Button, Box, Group} from '@mantine/core';
import Layout from "../Layout";

const schema = z.object({
    name: z.string().min(2, {message: 'Le nom ne doit pas être vide'}),
    email: z.string().email({message: 'Format invalide'}),
    password: z.string().min(6, {message: 'Le mot de passe doit contenir au moins 6 caractères'}),
});


export default function Inscription() {
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    return (
        <Layout>
            <div className="bg-white rounded-lg p-6 shadow-xl space-y-12">
                <section>
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                    </form>
                </section>
                <section>
                    <div className="pad10 mTop10">
                        <Button type="submit" fullWidth size="lg" className="bg-green-600 flex justify-center">
                            S'inscrire
                        </Button>
                        <Button variant={"outline"} fullWidth size="lg" className="bg-white-600 flex justify-center"
                                onClick={() => {
                                    window.location.href = "/connexion"
                                }}>
                            Déjà un compte ? Se connecter
                        </Button>
                    </div>
                </section>
            </div>
        </Layout>
    );
}