import { ArrowLeft, CalendarDays, Clock3, PenLine, ShieldCheck } from "lucide-react";
import { getAuthor, getBlogPost, getPublishedPosts, formatPostDate } from "../blogPosts";
import BlogCard from "../components/BlogCard";

export default function Blog() {
  const posts = getPublishedPosts();

  return (
    <section className="bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_0.72fr] lg:items-end">
          <div>
            <p className="eyebrow">Community Stories & Tips</p>
            <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] text-conecly-ink sm:text-6xl lg:text-[4.75rem]">
              Helpful local notes, written with care.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-conecly-ink/68 sm:text-xl sm:leading-9">
              Founder-led guides, stories, and practical advice for moving, cleaning, caregiving, safety, newcomer life, side gigs, and community trust.
            </p>
          </div>

          <aside className="rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
              <ShieldCheck size={23} />
            </div>
            <h2 className="mt-5 text-2xl font-semibold leading-tight text-conecly-ink">Founder/admin published</h2>
            <p className="mt-4 text-sm leading-6 text-conecly-ink/64">
              CONECLY is keeping this section editorial and moderated while the platform establishes trust, tone, safety, and visual consistency. Public submissions and comments are not open yet.
            </p>
          </aside>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogArticle({ slug }) {
  const post = getBlogPost(slug);

  if (!post) {
    return <BlogNotFound />;
  }

  const author = getAuthor(post);

  return (
    <article className="bg-conecly-paper">
      <header className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-18 lg:py-20">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-conecly-teal transition hover:text-conecly-forest"
        >
          <ArrowLeft size={16} />
          Back to stories
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-conecly-ink/54">
          <span className="rounded-lg bg-conecly-mist px-3 py-1.5 text-conecly-teal">{post.category}</span>
          <span className="inline-flex items-center gap-1.5 normal-case">
            <CalendarDays size={14} />
            {formatPostDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5 normal-case">
            <Clock3 size={14} />
            {post.readTime}
          </span>
        </div>
        <h1 className="mt-6 max-w-4xl text-[2.45rem] font-semibold leading-[1.04] text-conecly-ink sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-conecly-ink/68 sm:text-xl sm:leading-9">{post.summary}</p>
        <div className="mt-8 flex items-center gap-3 border-t border-conecly-ink/10 pt-6 text-sm text-conecly-ink/62">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-conecly-teal shadow-line">
            <PenLine size={19} />
          </div>
          <div>
            <p className="font-semibold text-conecly-ink">{author.name}</p>
            <p>{author.role}</p>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <img src={post.image} alt="" className="max-h-[520px] w-full rounded-lg object-cover shadow-line" />
        </div>
      )}

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,760px)_1fr]">
        <div className="rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-9">
          {post.sections.map((section) => (
            <section key={section.heading} className="border-b border-conecly-ink/10 py-8 first:pt-0 last:border-b-0 last:pb-0">
              <h2 className="text-2xl font-semibold leading-tight text-conecly-ink sm:text-3xl">{section.heading}</h2>
              <div className="mt-5 grid gap-5 text-base leading-8 text-conecly-ink/68">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-conecly-ink/10 bg-conecly-mist p-6 shadow-line">
          <p className="eyebrow">Editorial note</p>
          <h2 className="mt-4 text-2xl font-semibold leading-tight text-conecly-ink">Published by CONECLY</h2>
          <p className="mt-4 text-sm leading-6 text-conecly-ink/66">
            This section is founder/admin-led for now. Public posting and comments will be considered later after clear standards for quality, safety, and community tone are in place.
          </p>
          <a
            href="/safety"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-conecly-teal transition hover:text-conecly-forest"
          >
            Read safety guidance
          </a>
        </aside>
      </div>
    </article>
  );
}

function BlogNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
      <p className="eyebrow">Story not found</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight text-conecly-ink sm:text-5xl">This article is not available.</h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-conecly-ink/64">
        It may have moved, or it may not be published yet.
      </p>
      <a
        href="/blog"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-conecly-teal"
      >
        View all stories
      </a>
    </section>
  );
}
