import { Fragment, useEffect, useState } from "react";
import { octokit } from "../../utils/request";
import { endpoints } from "../../apis/datasource/endpoints";
import { Base } from "../../components/layout";
import { MetaHead } from "../../utils/metahead";
import { Breadcrumb, Col, Form, Row, Skeleton } from "antd";
import { Mask, SpinLoading } from "antd-mobile";
import { CardForm } from "../../components/home/form";
import { Results } from "../../components/home/results";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import styles from "./home.module.scss";

export function Home() {
 const [LoadingFirst, setLoadingFirst] = useState<boolean>(true);
 const [Loading, setLoading] = useState<boolean>(false);
 const [ShowResults, setShowResults] = useState<boolean>(false);
 const [Username, setUsername] = useState<string>("");
 const [ValueInput, setValueInput] = useState<string>("");
 const [ListSearching, setListSearching] = useState<string[]>([]);
 const [ListRepos, setListRepos] = useState<object[]>([]);
 const [CurrentValue, setCurrentValue] = useState<string>("");
 const [form] = Form.useForm();

 useEffect(() => {
  setTimeout(() => {
   setLoadingFirst(false);
  }, 1000);
 }, []);

 const onSearchUsers = async (value: any) => {
  const { username } = value?.home;
  setShowResults(false);
  setLoading(true);
  setUsername(username);
  const reqSearch = await octokit.request(`GET ${endpoints.SEARCH_USER}`, {
   q: `${username}`,
   headers: {
    "X-GitHub-Api-Version": "2022-11-28"
   }
  });

  if (reqSearch.status === 200) {
   setListSearching(reqSearch?.data?.items);
   setTimeout(() => {
    setShowResults(true);
    setLoading(false);
    setListRepos([]);
   }, 1000);
  }
 };

 const onGetRepos = async (value: string) => {
  if (CurrentValue !== value) {
   setLoading(true);
   const reqRepos = await octokit.request("GET /users/{username}/repos", {
    username: value,
    headers: {
     "X-GitHub-Api-Version": "2022-11-28"
    }
   });
   if (reqRepos.status === 200) {
    setListRepos(reqRepos?.data);
    setCurrentValue(value);
    setTimeout(() => {
     setLoading(false);
    }, 1000);
   }
  } else {
   setTimeout(() => {
    setListRepos([]);
   }, 1000);
  }
 };

 const onChangeUsername = async (event: any) => {
  setValueInput(event.target.value);
  if (event.target.value === "") {
   setShowResults(false);
  }
 };

 const onResetAll = () => {
  setLoadingFirst(true);
  setValueInput("");
  setUsername("");
  setShowResults(false);
  form.resetFields();
  setTimeout(() => {
   setLoadingFirst(false);
  }, 1000);
 };

 const onGoToRepo = (url: string) => {
  window.open(url, "_blank", "rel=noopener noreferrer");
 };

 return (
  <Fragment>
   <MetaHead title="Home" />
   <Base>
    <div className={styles.rtga__container}>
     <Row gutter={[24, 12]}>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
       {LoadingFirst ? (
        <Skeleton.Input active />
       ) : (
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
       )}
      </Col>
      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
       <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_SITE_KEY || ""}
       >
        <CardForm
         onSearchUsers={onSearchUsers}
         onChangeUsername={(event: any) => onChangeUsername(event)}
         ValueInput={ValueInput}
         form={form}
         LoadingFirst={LoadingFirst}
        />
       </GoogleReCaptchaProvider>
      </Col>
      {ShowResults && (
       <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
        <Results
         styles={styles}
         ListRepos={ListRepos}
         ListSearching={ListSearching}
         Username={Username}
         onGetRepos={onGetRepos}
         Loading={Loading}
         onResetAll={onResetAll}
         onGoToRepo={onGoToRepo}
        />
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
