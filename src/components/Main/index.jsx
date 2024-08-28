import { useState } from "react";
import Image from "next/image";
import ShoesMain from "@/public/images/shoesMain.svg";
import styles from "./Main.module.css";

import ProductGrid from "../ProductGrid";

export default function Main({ initialProducts }) {
  const [products] = useState(initialProducts || []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.divTittle}>
          <h1 className={styles.tittle}>Estilo e conforto para os seus pés</h1>
        </div>
        <div className={styles.divShoes}>
          <Image
            src={ShoesMain}
            className={styles.image}
            alt="Shoes Main Image"
          />
        </div>
      </div>

      <main className={styles.main}>
        <ProductGrid products={products} />
      </main>
    </>
  );
}