import Image from "next/image";
import ShoesMain from "@/public/images/shoesMain.svg";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.divTittle}>
        <h1 className={styles.tittle}>Estilo e conforto para os seus pés</h1>
      </div>
      <div className={styles.divShoes}>
        <Image
          src={ShoesMain}
          className={styles.image}
        ></Image>
      </div>
    </div>
  );
}
