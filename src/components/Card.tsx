import React from 'react';
import styles from '../styles/Card.module.scss';

function Card ({ item }: { item: string}) {
  return (
    <div className={styles.card}>{item}</div>
  );
}

export default Card;
