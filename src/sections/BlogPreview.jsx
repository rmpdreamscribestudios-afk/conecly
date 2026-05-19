import { ArrowRight } from "lucide-react";
import { getFeaturedPosts } from "../blogPosts";
import BlogCard from "../components/BlogCard";
import SectionHeader from "../components/SectionHeader";

export default function BlogPreview() {
  const posts = getFeaturedPosts(3);

  return (
    <section className="section-frame section-pad bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.55fr] lg:items-end">
          <SectionHeader
            eyebrow="Community Stories & Tips"
            title="Practical notes for local life."
            text="Founder-led stories, checklists, and safety-minded guides for helping, hiring, moving, caring, and getting settled nearby."
          />
          <div className="flex justify-center lg:justify-end">
            <a
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/12 bg-conecly-paper px-5 py-3 text-sm font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal"
            >
              Visit the blog
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
