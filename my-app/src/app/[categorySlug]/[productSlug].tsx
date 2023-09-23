import { useRouter } from 'next/router';
import { PRODUCTS_CATEGORY_DATA } from 'tp-kit/data';
import Image from 'next/image';

const ProductPage = () => {
    const router = useRouter();
    const { categorySlug, productSlug } = router.query;

    const product = {
        ...PRODUCTS_CATEGORY_DATA[0].products[0],
        category: {
            ...PRODUCTS_CATEGORY_DATA[0],
            products: PRODUCTS_CATEGORY_DATA[0].products.slice(1),
        },
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Category: {product.category.slug}</p>
            <Image
                src={product.img}
                alt={product.name}
                width={400}
                height={300}
                priority
            />
            <p>Description: {product.desc}</p>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default ProductPage;