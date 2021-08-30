import type { GetStaticProps } from 'next'

import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { client } from '../contentful'
import { IHomeFields } from '../contentful/types'

export default function Home({ title, description }: IHomeFields) {
  return (
    <Container>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <div>{description && documentToReactComponents(description)}</div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contentfulEntries = await client.getEntries<IHomeFields>({
    content_type: 'home',
    limit: 1,
  })
  const homePage = contentfulEntries.items[0]

  return {
    props: {
      title: homePage.fields.title,
      description: homePage.fields.description,
    },
    revalidate: 3600,
  }
}
