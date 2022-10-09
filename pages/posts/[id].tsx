import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/post'
import Head from "next/head";

const Posts = ({
  postData,
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) => {
  return <div>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1>{postData.title}</h1>
      <div>
        {postData.date}
      </div>
      <div dangerouslySetInnerHTML={{__html:postData.contentHtml}} />
    </article>
  </div>
}

export default Posts

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData,
    },
  }
}
