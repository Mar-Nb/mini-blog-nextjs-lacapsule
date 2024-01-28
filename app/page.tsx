import { ArticlesList } from '@/components/ArticlesList';
import styles from './page.module.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <section className="hero is-medium">
        <div className="hero-head">
          <Navbar />
        </div>

        <div className={`hero-body ${styles.wpHero}`}>
          <div className="container has-text-centered has-text-white">
            <h1 className="is-size-2 has-text-weight-semibold">Weeb Center</h1>
            <p>100% animés, 100% mangas</p>
          </div>
        </div>
      </section>

      <main className="container">
        <section className="section">
          <ArticlesList />
        </section>
      </main>

      <Footer />
    </>
  );
}
