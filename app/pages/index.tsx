import { GetStaticProps } from 'next';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import Search from '../components/Search';
import Layout from '../components/Layout';
import Paperbase from '../components/Paperbase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../redux/actions';
import { IAppState } from '../redux/initial-state';
import { useRealmApp, RealmAppProvider } from "../RealmApp";
import { Login } from '../components/Login';

type Props = {
  realmAppId: string
}

const REALM_APP_ID = process.env.REALM_APP_ID

// const REALM_APP_ID = 'iot_data-nkiiw'




const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <Login />;
};

function Home(props: Props) {

  const [user, setUser] = useState(null)

  return (
    // <Layout title="Home">
    //   <Container fluid className="pt-5 mx-auto" >
    //     <Search indexFields={props.indexFields} />
    //   </Container>
    // </Layout>
    // <Paperbase/>
    <RealmAppProvider appId={props.realmAppId}>
      <RequireLoggedInUser>
        {/* {<Root />} */}
        <Paperbase />
      </RequireLoggedInUser>
    </RealmAppProvider>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const realmAppId = process.env.REALM_APP_ID 
  return { props: { realmAppId } }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);