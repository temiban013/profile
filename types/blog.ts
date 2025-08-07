// types/blog.ts
export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly publishedAt: Date;
  readonly updatedAt?: Date;
  readonly tags: readonly string[];
  readonly category: string;
  readonly readingTime: number;
  readonly featured: boolean;
  readonly language: "en" | "es";
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
