import useSWR from 'swr'

const fetcher = (key) => fetch(key).then((res) => res.json())

export default function HostSelector() {
  const { data } = useSWR('/api/data', fetcher)

  return (
    <div>
      {data?.users?.map(({ key, value }) => (
        <p key={key}>{value.name}</p>
      ))}
    </div>
  )
}
