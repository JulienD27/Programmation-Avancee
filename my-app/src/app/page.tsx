import Image from 'next/image'
import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {BreadCrumbs, SectionContainer} from "tp-kit/components";
import {ProductGridLayout, ProductCardLayout} from "tp-kit/components/products";
import {Button} from "tp-kit/components/button";
const categories = PRODUCTS_CATEGORY_DATA;

export default function Home() {
    return (
        <main>
            <BreadCrumbs
                items={[
                    {
                        label: 'Accueil',
                        url: '#'
                    }
                ]}
            />

            <SectionContainer>
                <ProductGridLayout products={categories[0].products}>
                    {product => (
                        <ProductCardLayout product={product} button={<Button fullWidth variant="ghost">Ajouter au panier</Button>}/>
                        )}

                </ProductGridLayout>
            </SectionContainer>
        </main>
    )
}
