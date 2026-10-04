import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { SubjectFilterTabs } from "@/components/blog/subject-filter-tabs";
import { blogSubjects } from "@/config/blog-subjects";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/blog",
  useSearchParams: () => new URLSearchParams(),
}));

const subject = blogSubjects[0];

function renderFilter(activeSubject: string | null) {
  return render(
    <SubjectFilterTabs
      activeSubject={activeSubject}
      availableSubjects={[subject.slug]}
      locale="en"
      counts={{ [subject.slug]: 2 }}
      totalCount={5}
    />
  );
}

describe("SubjectFilterTabs", () => {
  it("renders a labelled group of toggle buttons, not a tablist", () => {
    renderFilter(null);

    const group = screen.getByRole("group", { name: "Filter by subject" });
    const buttons = within(group).getAllByRole("button");

    expect(buttons).toHaveLength(2);
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tab")).toBeNull();
    for (const button of buttons) {
      expect(button.getAttribute("type")).toBe("button");
      expect(button.hasAttribute("aria-selected")).toBe(false);
    }
  });

  it("marks only the active filter as pressed", () => {
    const { unmount } = renderFilter(null);
    let [all, first] = screen.getAllByRole("button");
    expect(all.getAttribute("aria-pressed")).toBe("true");
    expect(first.getAttribute("aria-pressed")).toBe("false");
    unmount();

    renderFilter(subject.slug);
    [all, first] = screen.getAllByRole("button");
    expect(all.getAttribute("aria-pressed")).toBe("false");
    expect(first.getAttribute("aria-pressed")).toBe("true");
  });
});
