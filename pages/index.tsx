import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import client from '../contentful'
import { HomepageContent } from '../types/contentful'

export default function Home({ title }: { title: string }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const contentfulEntries = await client.getEntries<HomepageContent>({
    content_type: 'home',
    limit: 1,
  })
  const homePage = contentfulEntries.items[0]

  return {
    props: {
      title: homePage.fields.title,
    },
    revalidate: 3600,
  }
}
