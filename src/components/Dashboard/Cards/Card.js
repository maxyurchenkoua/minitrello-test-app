
function Card({ tasks, title }) {
  return (
    <div className="p-6 w-56 m-1">
      <div className="items-center text-center">
        <h2 className="card-title text-sm text-gray-700">{title}</h2>
        {tasks.map((task) => (
          <div key={task.id} className="mt-2 p-3 shadow bg-slate-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card