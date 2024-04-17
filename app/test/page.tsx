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

