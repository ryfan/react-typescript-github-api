import { Modal, TabBar } from "antd-mobile";
import {
 AppOutline,
 HeartOutline,
 InformationCircleOutline
} from "antd-mobile-icons";
import { useState } from "react";
import styles from "./footer.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
 const location = useLocation();
 const { pathname } = location;
 const [activeMenu, setactiveMenu] = useState<string | null>(null);
 const [visible, setvisible] = useState<boolean>(false);
 const navigate = useNavigate();
 const showModal = () => {
  setvisible(true);
  setactiveMenu("/about");
 };

 const hideModal = () => {
  setvisible(false);
  setactiveMenu(pathname);
 };

 const Home = () => {
  navigate("/");
 };

 const tabs = [
  {
   key: "/",
   title: "Home",
   icon: <AppOutline onClick={Home} />
  },
  {
   key: "/about",
   title: "About",
   icon: <InformationCircleOutline onClick={showModal} />
  }
 ];

 return (
  <div className={styles.rtga__footer}>
   <TabBar activeKey={activeMenu ? activeMenu : pathname} safeArea={true}>
    {tabs.map((item) => (
     <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
    ))}
   </TabBar>
   <Modal
    title="Credits"
    visible={visible}
    content={
     <div>
      <p>Author by</p>
      <span>
       Ryfan Aditya Indra <br /> Software Engineer Frontend <br /> Restful API
       by GitHub API <br /> Made with <HeartOutline /> at Bogor
      </span>
     </div>
    }
    onClose={hideModal}
    closeOnMaskClick={true}
   />
  </div>
 );
}
