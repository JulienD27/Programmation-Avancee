import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import {getCategory} from "../../utils/get-category";
import {notFound} from "next/navigation";

type Props = {
  categorySlug: string;
};

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
const category = await getCategory(params.categorySlug);
  return {
    title: category.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`
  }
}

export default function CategoryPage({params}: NextPageProps<Props>) {
    const category = PRODUCTS_CATEGORY_DATA.find(category => category.slug === params.categorySlug);
    if (!category){
        return notFound();
    }
  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category.name,
          url: `/${category.slug}`
        }
      ]}
    />

    <ProductList categories={[category]} />
  </SectionContainer>
}
