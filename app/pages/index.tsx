import { GetStaticProps } from 'next';
import React from 'react'
import { Container } from 'react-bootstrap';
import Search from '../components/Search';
import Layout from '../components/Layout';
import Paperbase from '../components/Paperbase';

type Props = {
  indexFields: string[]
}

export default function Home(props: Props) {
  return (
    // <Layout title="Home">
    //   <Container fluid className="pt-5 mx-auto" >
    //     <Search indexFields={props.indexFields} />
    //   </Container>
    // </Layout>
    <Paperbase/>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const indexFields = process.env.INDEX_FIELD ? process.env.INDEX_FIELD.split(' ') : []
  return { props: { indexFields } }
}