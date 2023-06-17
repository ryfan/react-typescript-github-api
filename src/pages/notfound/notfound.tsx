import { Fragment } from 'react';
import { Card, ErrorBlock } from 'antd-mobile';
import { MetaHead } from '../../utils/metahead';
import { Base } from '../../components/layout';

export function NotFound() {
 return (
  <Fragment>
   <MetaHead title="404 Not Found" />
   <Base>
    <div style={{ padding: 12 }}>
     <Card style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
      <ErrorBlock
       title="404 Not Found"
       image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
       style={{
        '--image-height': '150px'
       }}
       description={<span>Your Destination Has Been Moved or Removed</span>}
      ></ErrorBlock>
     </Card>
    </div>
   </Base>
  </Fragment>
 );
}
