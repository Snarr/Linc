function BioTag({children}: {children: string}) {
  return (<div className="text-black bg-white rounded-full px-3 py-2 w-fit h-fit select-none text-xs flex justify-center items-center text-center">
    {children}
  </div>)
}

export default BioTag;