import React, { Suspense } from "react";



const WithSuspense = (Component) => (props) =>
(
  <Suspense fallback={'Loading...'}>
    <Component {...props} />
  </Suspense>
);

export default WithSuspense;