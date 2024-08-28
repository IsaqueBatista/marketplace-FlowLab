import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProductById } from "@/src/pages/api/api";
import styles from "./DetailsProduct.module.css";
import IconPix from "@/public/images/pix.svg";

export default function DetailsProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (id) {
        setIsLoading(true);
        try {
          const fetchedProduct = await fetchProductById(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadProduct();
  }, [id]);

  if (router.isFallback || isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!product) {
    return <div className={styles.error}>Produto não encontrado</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.productDetails}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={471}
            layout="responsive"
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <div className={styles.contentValues}>
            <Image src={IconPix} alt="Ícone Pix" />
            <p className={styles.originalPrice}>
              De R$ {product.originalPrice.toFixed(2)}
            </p>
            <p className={styles.currentPrice}>
              R$ {product.currentPrice.toFixed(2)}
            </p>
            <p className={styles.discount}>
              no pix <span>{product.discount}%</span> de desconto
            </p>
          </div>
          <Link href="/Cart">
            <button className={styles.buttonAddCart}>
              Adicionar ao carrinho
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
}
