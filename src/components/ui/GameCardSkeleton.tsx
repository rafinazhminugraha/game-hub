export default function GameCardSkeleton() {
  return (
    <article className="flex flex-col w-full overflow-hidden rounded-xl border border-border/60 bg-surface shadow-sm animate-pulse">
      <figure className="aspect-video w-full bg-surface-hover">
        <div className="h-full w-full bg-linear-to-br from-surface-hover via-surface to-surface-hover" />
      </figure>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-surface-hover" />
          <span className="h-5 w-5 rounded-full bg-surface-hover" />
          <span className="h-5 w-5 rounded-full bg-surface-hover" />
          <span className="h-5 w-5 rounded-full bg-surface-hover" />
        </div>

        <header className="space-y-2">
          <div className="h-8 w-full rounded-md bg-surface-hover" />
          <div className="h-5 w-2/5 rounded-md bg-surface-hover" />
        </header>

        <footer>
          <ul className="flex flex-wrap gap-2">
            <li className="h-6 w-16 rounded-full bg-surface-hover" />
            <li className="h-6 w-20 rounded-full bg-surface-hover" />
            <li className="h-6 w-14 rounded-full bg-surface-hover" />
            <li className="h-6 w-18 rounded-full bg-surface-hover" />
          </ul>
        </footer>
      </div>
    </article>
  );
}
