"use client";
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {SectionContainer} from "tp-kit/components";
import {z} from 'zod';
import {useForm, zodResolver} from '@mantine/form';
import {PasswordInput, TextInput, Button, Box, Group, Card} from '@mantine/core';
import Layout from "../Layout";

const schema = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(8, {message: 'Invalid password'}),
});


export default function Connexion() {
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
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
                            label="Adresse email"
                            placeholder="lin.guini@barilla.it"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            withAsterisk
                            label="Mot de passe"
                            placeholder={"Ke$$a..."}
                        />
                    </form>
                </section>
                <section>
                    <div className="pad10 mTop10">
                        <Button type="submit" fullWidth size="lg" className="bg-green-600 flex justify-center">
                            Se connecter
                        </Button>
                        <Button variant={"outline"} fullWidth size="lg" className="bg-white-600 flex justify-center" onClick={() => { window.location.href = "/inscription"}}>
                            S'inscrire
                        </Button>
                    </div>
                </section>
            </div>
        </Layout>

    );
}