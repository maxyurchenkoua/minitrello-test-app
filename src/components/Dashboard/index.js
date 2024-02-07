import Card from "./Cards/Card"

const cards = [
  {
    id: 'planned',
    title: 'Planned',
    tasks: [
      {
        'id': 1,
        'title': 'blablabla 1',
        'description': 'blablabla blablabla blablabla'
      },
      {
        'id': 2,
        'title': 'blablabla 2',
        'description': 'blablabla 2 blablabla 2 blablabla'
      },
    ]
  },
  {
    id: 'in_work',
    title: 'In work',
    tasks: [
      {
        'id': 3,
        'title': 'blablabla 1',
        'description': 'blablabla blablabla blablabla'
      },
      {
        'id': 4,
        'title': 'blablabla 2',
        'description': 'blablabla 2 blablabla 2 blablabla'
      },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        'id': 5,
        'title': 'blablabla 1',
        'description': 'blablabla blablabla blablabla'
      },
      {
        'id': 6,
        'title': 'blablabla 2',
        'description': 'blablabla 2 blablabla 2 blablabla'
      },
    ]
  }
]

function Dashboard() {
  return (
    <div className="drawer-content flex flex-row p-12 bg-base-200">
      {cards.map((card) => (
        <Card key={card.id} title={card.title} tasks={card.tasks} />
      ))}
    </div>
  )
}


export default Dashboard