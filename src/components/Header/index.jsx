import Image from "next/image";
import styles from "./Header.module.css";
import { Inter } from "next/font/google";
import Link from "next/link";

import Logo from "@/public/images/logo.svg";
import Cart from "@/public/images/cart.svg";
import User from "@/public/images/user.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={Logo} 
            alt="Logo Flow Lab" 
            width={147} 
            height={24} />
          </Link>
        </div>

        <nav className={styles.navigation}>
          <div className={styles.navItem}>
          <Link href="/cart" className={styles.navLink}>
            <Image src={Cart} 
            alt="Ícone do carrinho" 
            width={13} 
            height={11} />
            <p className={`${styles.navText} ${inter.className}`}>Carrinho</p>
            </Link>
          </div>

          <div className={styles.navItem}>
          <Link href="#" className={styles.navLink}>
            <Image src={User} 
            alt="Ícone de usuário" 
            width={13} 
            height={11} />
            <p className={`${styles.navText} ${inter.className}`}>Entrar</p>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
