import { Fragment, useState } from "react";
import { octokit } from "../../utils/request";
import { endpoints } from "../../apis/datasource/endpoints";
import { Base } from "../../components/layout";
import { MetaHead } from "../../utils/metahead";
import { Breadcrumb, Button, Card, Col, Form, Input, Row, Space } from "antd";
import { Collapse, Mask, SpinLoading } from "antd-mobile";
import styles from "./home.module.scss";
import { map, take } from "lodash";
import { StarOutline } from "antd-mobile-icons";

export function Home() {
 const [Loading, setLoading] = useState<boolean>(false);
 const [Username, setUsername] = useState<string | null>(null);
 const [ListSearching, setListSearching] = useState<string[]>([]);
 const [ListRepos, setListRepos] = useState<object[]>([]);
 const [form] = Form.useForm();

 const onSearchUsers = async (value: any) => {
  const { username } = value?.home;
  setLoading(true);
  setUsername(null);
  const reqSearch = await octokit.request(`GET ${endpoints.SEARCH_USER}`, {
   q: `${username}`,
   headers: {
    "X-GitHub-Api-Version": "2022-11-28"
   }
  });
  if (reqSearch.status === 200) {
   setListSearching(reqSearch?.data?.items);
   setTimeout(() => {
    setLoading(false);
    setListRepos([]);
    setUsername(username);
   }, 1000);
  }
 };

 const onGetRepos = async (value: string) => {
  setLoading(true);
  setListRepos([]);
  const reqRepos = await octokit.request("GET /users/{username}/repos", {
   username: value,
   headers: {
    "X-GitHub-Api-Version": "2022-11-28"
   }
  });
  if (reqRepos.status === 200) {
   setListRepos(reqRepos?.data);
   setTimeout(() => {
    setLoading(false);
   }, 1000);
  }
 };

 return (
  <Fragment>
   <MetaHead title="Home" />
   <Base>
    <div className={styles.rtga__container}>
     <Row gutter={[24, 24]}>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
       <Breadcrumb
        items={[
         {
          title: "App"
         },
         {
          title: "Home"
         }
        ]}
       />
      </Col>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
       <Card hoverable title="Search User on GitHub">
        <Form
         layout="vertical"
         autoComplete="off"
         form={form}
         onFinish={onSearchUsers}
        >
         <Form.Item name={["home", "username"]}>
          <Input placeholder="Enter username" size="large" />
         </Form.Item>
         <Button htmlType="submit" type="primary" size="large" block>
          Search
         </Button>
        </Form>
       </Card>
      </Col>
      {Username && (
       <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <Card title={`Showing users for "${Username}"`}>
         <Collapse accordion>
          {map(take(ListSearching, 5), (LS: any, idx: string) => (
           <Collapse.Panel
            key={idx}
            title={LS.login}
            onClick={() => onGetRepos(LS.login)}
           >
            <Row gutter={[12, 12]}>
             {map(take(ListRepos, 5), (LR: any, idx: string) => (
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
               <Card
                loading={Loading}
                title={
                 <div className={styles.rtga__container__card__title}>
                  {LR.name}
                 </div>
                }
                key={idx}
                extra={
                 <>
                  <StarOutline /> {LR.stargazers_count}
                 </>
                }
               >
                {LR?.description ?? "-"}
               </Card>
              </Col>
             ))}
            </Row>
           </Collapse.Panel>
          ))}
         </Collapse>
        </Card>
       </Col>
      )}
     </Row>
     <Mask visible={Loading}>
      <div className={styles.rtga__container__loading}>
       <SpinLoading color="black" style={{ "--size": "48px" }} />
      </div>
     </Mask>
    </div>
   </Base>
  </Fragment>
 );
}
