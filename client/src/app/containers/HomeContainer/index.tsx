import * as React from 'react';

import { Navbar, Home } from '../../components';


import { observer } from 'mobx-react';
// import { useLocation, useHistory } from 'react-router';

export const HomeContainer = observer(() => {
  // const history = useHistory();
  // const location = useLocation();

  return (
    <div className="content">
      <Navbar />
      <Home />
    </div>
    /*  <div className={style.normal}>
      <Header />
      <Footer />
    </div> */
  );
});
