export default function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Get difference in ms
    const diffMs = now.getTime() - date.getTime();

    // Convert to days
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "1 day ago";
    } else {
        return `${diffDays} days ago`;
    }
}
