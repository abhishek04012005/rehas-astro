import { BlogSection } from "@/components/sections/BlogSection";

export default function BlogPage() {
  return (
    <div className="pageShell">
      <main>
        <BlogSection showAll />
      </main>
    </div>
  );
}
