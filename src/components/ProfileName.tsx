function ProfileName({name}: {name: string | null}) {
  return (<div className="text-3xl text-white text-center font-bold">
    {name}
  </div>)
}

export default ProfileName;