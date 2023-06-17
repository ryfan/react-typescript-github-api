import Header from './header';
import Footer from './footer';
import styles from './base.module.scss';

interface PropsBase {
 children: any;
}

export default function Base({ children }: PropsBase) {
 return (
  <div className={styles.rtga__layout}>
   <Header />
   <div className={styles.rtga__layout__content}>{children}</div>
   <Footer />
  </div>
 );
}
