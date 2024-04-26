import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../more-stories";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";
import { ContentfulPreviewProvider } from '@/components/contentful-preview-provider';
import { HeroPost } from "@/app/components/article";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <ContentfulPreviewProvider
          locale="en-US"
          enableInspectorMode={true}
          enableLiveUpdates={true}
        >
          <HeroPost post={post}/>
      </ContentfulPreviewProvider>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
