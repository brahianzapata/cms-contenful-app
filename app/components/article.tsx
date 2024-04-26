/*
  We have to make this a client component to use the `useContentfulInspectorMode` and `useContentfulLiveUpdates` hooks to enable live preview mode.
  This does not mean it is rendered on the client, but that the HTML, CSS and JavaScript are shipped to the client to hydrate the page.
  This is necessary because we need interactivity to enable live preview mode.
*/
'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import CoverImage from '../cover-image';
import Avatar from '../avatar';
import Date from "../date";

export const HeroPost = ({ post }: any) => {
  const updatedBlog = useContentfulLiveUpdates(post);
  const inspectorProps = useContentfulInspectorMode({ entryId: post.sys.id });

  return (
    <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl"
        {...inspectorProps({ fieldId: 'title' })}>
            {updatedBlog.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
            {updatedBlog.author && (
                <Avatar name={updatedBlog.author.name} picture={updatedBlog.author.picture} />
            )}
        </div>
        <div className="flex justify-between flex-col md:flex-row">
              <p
                className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400"
                {...inspectorProps({ fieldId: 'summary' })}
              >
                {updatedBlog.summary}
              </p>
              <p
                className="text-zinc-500 md:text-lg/relaxed lg:text-sm/relaxed xl:text-lg/relaxed dark:text-zinc-400 italic"
                {...inspectorProps({ fieldId: 'excerpt' })}
              >
                by: {updatedBlog.excerpt}
              </p>
            </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
            <CoverImage title={updatedBlog.title} url={updatedBlog.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
            {/* <div className="mb-6 block md:hidden">
                {updatedBlog.author && (
                <Avatar name={updatedBlog.author.name} picture={updatedBlog.author.picture} />
                )}
            </div> */}
        <div className="mb-6 text-lg">
            <Date dateString={updatedBlog.date} />
        </div>
        </div>

        {/* <div className="mx-auto max-w-2xl">
        <div className="prose">
            <Markdown content={updatedBlog.content} />
        </div>
        </div> */}
    </article>
  );
};