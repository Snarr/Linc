import { Link } from '.prisma/client'

function LinkButton({data}: {data: Link}) {
  return (<a href={data.url} key={data.id} className="px-4 py-4 rounded-full bg-slate-100 text-black font-semibold text-center w-full">
  {data.name}
</a>)
}

export default LinkButton;