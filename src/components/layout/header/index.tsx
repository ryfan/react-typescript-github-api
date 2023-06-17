import { AutoCenter, Image, NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo/github-logo-vector.svg'
import styles from './header.module.scss';

export default function Header() {
 const navigate = useNavigate();
 const onHome = () => {
  navigate('/');
 };
 return (
  <NavBar
   className={styles.rtga__header}
   onBack={onHome}
   backArrow={false}
  >
   <div className={styles.rtga__header__image}>
    <AutoCenter>
     <Image src={logo} width={150} lazy={true} />
    </AutoCenter>
   </div>
  </NavBar>
 );
}
