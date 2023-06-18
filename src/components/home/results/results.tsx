import { Button, Card, Col, Row, Skeleton, Tooltip } from "antd";
import { Collapse, ErrorBlock } from "antd-mobile";
import { LinkOutline, StarOutline } from "antd-mobile-icons";
import { map, take } from "lodash";

interface RProps {
 Username?: string;
 ListSearching?: string[];
 ListRepos?: object[];
 onGetRepos?: any;
 Loading?: boolean;
 styles: any;
 onResetAll: any;
 onGoToRepo: any;
}

export function Results({
 Username,
 ListSearching,
 ListRepos,
 onGetRepos,
 Loading,
 styles,
 onResetAll,
 onGoToRepo
}: RProps) {
 return (
  <Card title={`Showing users for "${Username}"`} hoverable>
   <Row gutter={[0, 24]}>
    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
     <Collapse accordion>
      {map(take(ListSearching, 5), (LS: any, idx: string) => (
       <Collapse.Panel
        key={idx}
        title={LS.login}
        onClick={() => onGetRepos(LS.login)}
       >
        <Row gutter={[12, 12]}>
         {Loading ? (
          <Skeleton active />
         ) : ListRepos?.length === 0 ? (
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} key={idx}>
           <Card>
            <ErrorBlock
             title="No have repository"
             image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
             style={{
              "--image-height": "80px"
             }}
             description=""
            ></ErrorBlock>
           </Card>
          </Col>
         ) : (
          map(take(ListRepos, 5), (LR: any, idx: string) => (
           <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} key={idx}>
            <Card
             loading={Loading}
             title={
              <div className={styles.rtga__container__card__title}>
               {LR.name}
              </div>
             }
             extra={
              <>
               <StarOutline /> {LR.stargazers_count}
              </>
             }
             actions={[
              <Tooltip placement="bottom" title="URL Repository">
               <LinkOutline key="url" onClick={() => onGoToRepo(LR.html_url)} />
              </Tooltip>
             ]}
            >
             {LR?.description ?? (
              <span className={styles.rtga__container__card__description}>
               No have description
              </span>
             )}
            </Card>
           </Col>
          ))
         )}
        </Row>
       </Collapse.Panel>
      ))}
     </Collapse>
    </Col>
    <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
     <Button type="primary" ghost block size="large" onClick={onResetAll}>
      Reset
     </Button>
    </Col>
   </Row>
  </Card>
 );
}
