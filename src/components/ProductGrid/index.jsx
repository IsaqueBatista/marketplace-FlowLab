import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar";
import CategoryFilter from "../CategoryFilter";
import PriceFilter from "../PriceFilter";
import styles from "./ProductGrid.module.css";

import { fetchProducts } from "@/src/pages/api/api";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(
          "Falha ao carregar produtos. Por favor, tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <h1 className={styles.searchBar_h1}>
          {products.length} itens encontrados
        </h1>
        <SearchBar />
      </div>

      <div className={styles.content}>
        <div className={styles.containerFilters}>
          <div className={styles.filters}>
            <CategoryFilter />
          </div>
          <div className={styles.filters}>
            <PriceFilter />
          </div>
        </div>
        <ul className={styles.productList}>
          {products.map((product) => (
            <li className={styles.cardProduct} key={product.id}>
              <Link href={`/DetailsProduct/${product.id}`}>
                <div>
                  <Image
                    src={product.image} 
                    alt={product.name} 
                    width={200} 
                    height={200} 
                    layout="responsive"
                  />
                  <p className={styles.category}>{product.category}</p>
                  <h2 className={styles.name}>{product.name}</h2>
                  <p className={styles.valueInitial}>De R$ {product.originalPrice.toFixed(2)}</p>
                  <div className={styles.divValuesAndDescount}>
                    <p className={styles.currentPrice}>
                      R$ {product.currentPrice.toFixed(2)}
                    </p>
                    <p className={styles.discount}>{product.discount}% OFF</p>
                  </div>
                </div>
              </Link>
              <button className={styles.buttonAddCart}>
                Adicionar ao carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}