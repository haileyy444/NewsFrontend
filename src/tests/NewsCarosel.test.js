import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import NewsFeed from "../components/NewsCarosel.js";
import TEST_ARTICLES from "./_testCommon.js";

it("renders without crashing - smoke test", function() {
  render(<NewsFeed />);
});

it("Matches snapshot - snapshot test", function() {
  const { asFragment } = render(<NewsFeed />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", async function() {
  render(
    <NewsFeed
      category="test-category"
      categoryName="images for testing"
    />
  );

  // Ensure the category name (h3 element) is displayed
  expect(screen.getByRole("heading", { name: /images for testing/i })).toBeInTheDocument();

  // Ensure the carousel exists
  const carousel = screen.getByRole("region", { name: /carousel/i });
  expect(carousel).toBeInTheDocument();

  // Get the right arrow button
  const rightArrow = screen.getByRole("button", { name: /›/i });

  // Test that clicking the right arrow shows the first article
  fireEvent.click(rightArrow);

  // Wait for the article to be rendered
  await waitFor(() => {
    expect(screen.getByText(TEST_ARTICLES[0].title)).toBeInTheDocument();
  });

  // Get the left arrow button
  const leftArrow = screen.getByRole("button", { name: /‹/i });

  // Test that clicking the left arrow takes you back to the previous article
  fireEvent.click(leftArrow);

  // Ensure the first article is back in view
  await waitFor(() => {
    expect(screen.getByText(TEST_ARTICLES[0].title)).toBeInTheDocument();
  });
});
