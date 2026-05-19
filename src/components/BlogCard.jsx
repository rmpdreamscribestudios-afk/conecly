import { ArrowRight, CalendarDays, Image as ImageIcon } from "lucide-react";
import { formatPostDate } from "../blogPosts";

export default function BlogCard({ post, compact = false }) {
  return (
    <article className="premium-card flex h-full flex-col overflow-hidden">
      {post.image ? (
        <img src={post.image} alt="" className="h-48 w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-conecly-mist text-conecly-teal">
          <ImageIcon size={34} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase text-conecly-ink/54">
          <span className="rounded-lg bg-conecly-mist px-3 py-1.5 text-conecly-teal">{post.category}</span>
          <span className="inline-flex items-center gap-1.5 normal-case text-conecly-ink/54">
            <CalendarDays size={14} />
            {formatPostDate(post.publishedAt)}
          </span>
        </div>
        <h3 className={`${compact ? "text-xl" : "text-2xl"} mt-5 font-semibold leading-tight text-conecly-ink`}>
          <a href={`/blog/${post.slug}`} className="transition hover:text-conecly-teal">
            {post.title}
          </a>
        </h3>
        <p className="mt-4 flex-1 text-sm leading-6 text-conecly-ink/64 sm:text-base sm:leading-7">{post.summary}</p>
        <a
          href={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-conecly-teal transition hover:text-conecly-forest"
        >
          Read story
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}
