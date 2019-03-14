import Head from 'next/head'

function Header() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Header.</p>
    </div>
  )
}

export default Header
