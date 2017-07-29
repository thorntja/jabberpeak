import React from 'react';

import Drawer from 'material-ui/Drawer';

const SidePanel = (props) => (
  <Drawer open={props.open} openSecondary={true} width={400} containerStyle={{height: 'calc(100% - 64px)', top: 64}}>
    <div>
      <h1>{props.resource.name}</h1>
      <h1>{props.resource.id}</h1>
    </div>
  </Drawer>
)

export default SidePanel;
