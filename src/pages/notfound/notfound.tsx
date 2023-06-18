import { Fragment } from "react";
import { Card, ErrorBlock } from "antd-mobile";
import { MetaHead } from "../../utils/metahead";
import { Base } from "../../components/layout";
import { Breadcrumb, Button, Col, Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./notfound.module.scss";

export function NotFound() {
 const navigate = useNavigate();
 const location = useLocation();
 const splitPathName = location.pathname.split("/");
 const onBackHome = () => {
  navigate("/");
 };
 return (
  <Fragment>
   <MetaHead title="404 Not Found" />
   <Base>
    <div className={styles.rtga__container}>
     <Row gutter={[24, 12]}>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
       <Breadcrumb
        items={[
         {
          title: "App"
         },
         {
          title: splitPathName[1]
         }
        ]}
       />
      </Col>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
       <Card className={styles.rtga__container__card}>
        <Row gutter={[0, 12]}>
         <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <ErrorBlock
           title="404 Not Found"
           image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
           style={{
            "--image-height": "150px"
           }}
           description={<span>Your Destination Has Been Moved or Removed</span>}
          ></ErrorBlock>
         </Col>
         <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Button type="primary" size="large" onClick={onBackHome}>
           Back to Home
          </Button>
         </Col>
        </Row>
       </Card>
      </Col>
     </Row>
    </div>
   </Base>
  </Fragment>
 );
}
