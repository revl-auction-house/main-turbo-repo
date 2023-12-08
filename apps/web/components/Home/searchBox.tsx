export function Search() {
  return (
    <div className="relative flex h-16 bg-slate-950">
      <div className="h-full w-10 flex-grow translate-y-2 rounded-br-lg bg-slate-950"></div>
      <form className="bgGradient relative flex h-fit w-full max-w-lg translate-y-1/2 items-center rounded-lg px-2 py-2">
        <input
          type="text"
          id="search"
          className="m-0.5 block w-full flex-grow rounded-lg  bg-voilet p-5 text-xl text-white placeholder-gray-400 shadow-lg shadow-gray-950/50 focus:border-white focus:ring-white "
          placeholder="Search anything....."
          required
        />

        <div className="m-0.5 ml-2 ">
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-voilet p-5 text-center text-sm font-medium text-white shadow-lg shadow-gray-950/50 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              className="h-6 w-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      </form>
      <div className="h-full w-10 flex-grow translate-y-2 rounded-bl-lg bg-slate-950"></div>
    </div>
  );
}
