import React from 'react';
import Image from "next/image";
import styles from "./CategoryFilter.module.css";
import searchIcon from "@/public/images/search.svg";

const categories = [
  { id: 'botas', label: 'Botas' },
  { id: 'chinelos', label: 'Chinelos' },
  { id: 'chuteiras', label: 'Chuteiras' },
  { id: 'sandalias', label: 'Sandálias' },
  { id: 'sapatenis', label: 'Sapatênis' },
  { id: 'tenis', label: 'Tênis' },
  { id: 'tenisDeCorrida', label: 'Tênis de Corrida' }
];

export default function CategoryFilter() {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Busca realizada");
  };
  return (
    <div className={styles.categoryFilter}>
      <h1 className={styles.titleCategory}>Categorias</h1>

      <form className={styles.divSearchBar} onSubmit={handleSearch}>
        <input
          className={styles.inputSearchBar}
          type="text"
          placeholder="Pesquisar"
        />
        <button type="submit" className={styles.searchButton}>
          <Image src={searchIcon} alt="Buscar" className={styles.searchIcon} />
        </button>
      </form>

      <div className={styles.categoriesContainer}>
        {categories.map(category => (
          <div key={category.id} className={styles.categoryItem}>
            <input
              className={styles.input}
              type="checkbox"
              id={category.id}
              name={category.id}
            />
            <label htmlFor={category.id}>{category.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}