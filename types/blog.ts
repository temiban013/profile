// types/blog.ts
export interface BlogAuthor {
  readonly name: string;
  readonly avatar?: string;
  readonly bio?: string;
  readonly url?: string;
}

export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly author?: BlogAuthor;
  readonly publishedAt: Date;
  readonly updatedAt?: Date;
  readonly tags: readonly string[];
  readonly category: string;
  readonly readingTime: number;
  readonly featured: boolean;
  readonly language: "en" | "es";
  readonly image?: string;
}

export interface BlogCategory {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly postCount: number;
}

export interface BlogTag {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly postCount: number;
}
