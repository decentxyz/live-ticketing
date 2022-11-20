import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import MintButton from '../components/MintButton';

const Home: NextPage = () => {
  return (
    <div className={`${styles.container} background`}>
      <Head>
        <title>Decent Events</title>
        <meta
          name="description"
          content='Distribute tickets for your live event using Decent NFTs.'
        />
        <link rel="icon" href="/images/favi.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={`${styles.title} font-medium tracking-widest font-[500] text-5xl`}>
          [FACELESS]
        </h1>

        <div className={`${styles.description} items-center gap-2`}>
          <p className='tracking-widest uppercase font-[400]'>Cross Community-Driven Art + Music Experience</p>
          <MintButton 
            address="0xDF56aE86DBd9c5643735E40429b0FC1D1e6EfA93"
            buttonText="Claim Ticket"
            width={24}
          />
        </div>

        <div className={`${styles.grid} cursor-pointer`}>
          <Link href='/'>
          <div className={`${styles.card} bg-gradient-to-br from-indigo-900 to-transparent`}>
            <h2 className='tracking-widest font-[500] uppercase'>Relevant Event Link 1</h2>
            <p className='tracking-widest'>Critical information about this event. Probably the Partiful Link</p>
          </div>
          </Link>

          <a href="https://decentxyz.gitbook.io/decent-sdk-documentation/" className={`${styles.card} bg-gradient-to-tl from-indigo-900 to-transparent`}>
            <h2 className='tracking-widest font-[500] uppercase'>Relevant Event Link 2</h2>
            <p className='tracking-widest'>Critical information about this event.  Probably the event description or deck you have.</p>
          </a>
        </div>
      </main>

      <footer className='py-8 border-t border-white text-white'>
        <a className='flex justify-center items-center text-xl' href="https://decent.xyz" target="_blank" rel="noopener noreferrer">
          <Image src='/images/decent.png' height={18} width={100} alt='Decent 💪' />
          <span className='pl-4 tracking-widest font-[400] uppercase text-sm'>ticketing</span> 
        </a>
      </footer>
    </div>
  );
};

export default Home;
