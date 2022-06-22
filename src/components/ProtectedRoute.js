import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  componentHeader: Header,
  componentFooter: Footer,
  componentMain: Main,
  ...props
}) => {
  const page = (
    <>
      <Header {...props} />
      <Main {...props} />
      <Footer {...props} />
    </>
  );
  return <Route>{() => (props.loggedIn ? page : <Redirect to="./sign-in" />)}</Route>;
};

export default ProtectedRoute;
