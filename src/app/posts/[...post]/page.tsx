import * as React from 'react'
import { getPost, getPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { ImageLightbox } from '@/components/image-lightbox'
// import type { Post } from '@/lib/schemas'
// import { join } from 'path'
// import sizeOf from 'image-size'
// import { readFile } from 'fs/promises'

const PostPage: React.FC<{
  params: {
    post: string | string[]
  }
}> = async ({ params }) => {
  const posts = await getPosts()

  if (!posts) {
    console.error('No posts found')
    return notFound()
  }
  const last = params.post[params.post.length - 1] || params.post
  const post = await getPost(last as string)

  // create routes for each post in the vault, respecting its folder structure
  // const post = Array.isArray(params.post)
  //   ? posts.find(
  //       (post: Post) =>
  //         post.slug === params.post[params.post.length - 1] &&
  //         post.path?.join('/') ===
  //           (params.post.slice(0, -1) as string[]).join('/')
  //     )
  //   : posts.find((post: Post) => post.slug === params.post)

  if (!post) {
    console.error('No post found')
    return notFound()
  }

  const frontmatter = post.frontmatter
  const title = frontmatter?.title || post.title

  const imageUrlsFromPost = post.content
    .match(/!\[.*?\]\((.*?)\)/g)
    ?.map((match) => match.match(/!\[.*?\]\((.*?)\)/)?.[1])

  console.log({ imageUrlsFromPost })
  return (
    <div className="w-full pt-12">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="prose sm:prose-lg prose-invert w-full max-w-none">
        <MDXRemote
          components={{
            Grid: ({ children, className = '' }) => (
              <div className={`grid grid-cols-2 gap-5 ${className}`}>
                {children.props.children}
              </div>
            ),
            img: async ({ src, alt = '' }) => {
              // return null
              console.log({ src })
              if (typeof src !== 'string') return null
              // let imageBuffer
              // imageBuffer = await readFile(
              //   new URL(
              //     join(
              //       import.meta.url,
              //       '..',
              //       '..',
              //       '..',
              //       '..',
              //       '..',
              //       'public',
              //       src
              //     )
              //   ).pathname
              // )
              // const { width, height } = sizeOf(imageBuffer)

              return (
                <ImageLightbox image={src} images={imageUrlsFromPost} />
                // <Image
                //   width={800}
                //   height={600}
                //   // width={width}
                //   // height={height}
                //   alt={alt}
                //   src={src}
                //   quality={100}
                // />
              )
            },
          }}
          source={post.content}
          options={{
            parseFrontmatter: true,
          }}
        />
      </div>
      <div>
        Meta:
        {frontmatter?.published ? 'Published' : 'Draft'}
        {/* <pre>{JSON.stringify(frontmatter)}</pre> */}
      </div>
    </div>
  )
}

export default PostPage
