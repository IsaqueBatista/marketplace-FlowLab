import Image from 'next/image';
import React from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '@/public/images/search.svg'; 

export default function SearchBar() {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Busca realizada');
  };

  return (
    <div className={styles.divSearchBar} onSubmit={handleSearch}>
      <input className={styles.inputSearchBar} type="text" placeholder="Pesquisar" />
      <button type="submit" className={styles.searchButton}>
        <Image src={searchIcon} alt="Buscar" className={styles.searchIcon} />
      </button>
    </div>
  );
}