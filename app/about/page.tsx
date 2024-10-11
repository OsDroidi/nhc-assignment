import { NHCLogo } from '../components/svgs';
import styles from './about.module.scss';
import { items } from './data';

export default function About() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <NHCLogo className={styles['logo']} />
      </div>
      {items.map((item) => (
        <div className={styles['items-container']} key={item?.id}>
          <div className={styles['title']}>{item?.title || ''}</div>
          <div className={styles['content']}>{item?.content || ''}</div>
        </div>
      ))}
    </div>
  );
}
