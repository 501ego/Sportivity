const RulesComponent = ({ rules }) => {
  let rulesArray = rules ? rules.split('\n') : []

  return (
    <div className="container max-w-4xl bg-slate-100 p-10">
      <h2 className="text-zinc-600 font-black text-4xl mb-2">
        Normas de la Comunidad:
      </h2>
      {rulesArray.map((rule, index) => (
        <p key={index} className="text-zinc-800">
          {rule}
        </p>
      ))}
    </div>
  )
}

export default RulesComponent
