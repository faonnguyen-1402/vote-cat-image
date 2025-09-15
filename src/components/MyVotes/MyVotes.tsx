import React from 'react';
import styles from './MyVotes.module.css';
import Image from 'next/image';

interface Vote {
  id: string;
  image_id: string;
  value: number;
  image: { id: string; url: string };
}

interface MyVotes {
  myVotes: Vote[];
}

function MyVotes({ myVotes }: MyVotes) {
  return (
    <div className={styles.container}>
      {myVotes.map((item) => (
        <div key={item.id} className={styles.item}>
          <Image
            className={styles.image}
            src={item.image.url}
            alt='no image'
            width={300}
            height={300}
          />
          <p className={styles['votes-text']}>
            {item.value === 1 ? 'Like 🥰' : 'Dislike 😡'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyVotes;
