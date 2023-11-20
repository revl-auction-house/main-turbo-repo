
export function Search() {
  return (
    <div className="relative flex h-16 bg-slate-950">
      <div className="flex-grow w-10 h-full translate-y-2 rounded-br-lg bg-slate-950"></div>
      <form className="relative flex items-center w-full max-w-lg px-2 py-2 translate-y-1/2 rounded-lg h-fit bgGradient">


        <input type="text" id="search"
          className="bg-voilet shadow-lg shadow-gray-950/50 flex-grow m-0.5  text-white text-xl rounded-lg focus:ring-white focus:border-white block w-full p-5 placeholder-gray-400 "
          placeholder="Search anything....." required />

        <div className="m-0.5 ml-2 "><button type="button"
          className="inline-flex items-center p-5 text-sm font-medium text-center text-white rounded-lg shadow-lg shadow-gray-950/50 bg-voilet hover:bg-blue-800 focus:outline-none focus:ring-blue-300 ">
          <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span className="sr-only">Icon description</span>
        </button></div>
      </form>
      <div className="flex-grow w-10 h-full translate-y-2 rounded-bl-lg bg-slate-950"></div>
    </div>
  );
}
