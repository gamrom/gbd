async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  const data = await res.json()
  console.log(data)
}

export default function TestPage() {
  const events = getEvents();
  return (
    <div>
      테스트 페이지입니다.
    </div>
  )
}