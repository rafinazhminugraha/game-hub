//Will Improve this later

export default function GameCardSkeleton() {
  return (
    <article className="flex flex-col bg-surface rounded-xl overflow-hidden animate-pulse">
      <figure className="w-full aspect-video bg-surface-hover overflow-hidden">
        <p>IMAGEE</p>
      </figure>
      <div className="flex flex-col gap-4 p-4">
        <p>ICON LIST</p>
        <header>
          <h2 className="text-3xl font-bold">
            <p>GAME NAME</p>
            <span className="font-semibold text-xl text-tx-muted">
             <p>GAME RATING</p>
            </span>
          </h2>
        </header>
        <footer>
          <ul className="flex flex-row gap-2 flex-wrap">
              <li className="font-medium text-lg text-tx-muted">
                <p>GENRE LIST</p>
              </li>
          </ul>
        </footer>
      </div>
    </article>
  );
}
