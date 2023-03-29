import { data } from '@ampt/data'

export default function User({ user }) {
  return (
    <div className="root">
      <main>
        <h1>Server-side data</h1>
        <p>{user?.id}</p>
        <p>{user?.name}</p>
      </main>
    </div>
  )
}

export async function getStaticProps(context: any) {
  const result = (await data.get(`user:${context.params.id}`, true)) as any

  return {
    props: {
      user: result?.value
    },
    notFound: !result?.value,
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const result = (await data.get('user:*', true)) as any

  return {
    paths: result.items.slice(0, 1).map(({ value }) => ({
      params: { id: value.id.toString() }
    })),
    fallback: true // true, false or "blocking"
  }
}
