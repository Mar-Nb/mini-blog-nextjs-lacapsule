'use client';

import { Navbar } from '@/components/Navbar';
import { Article } from '@/types/Article';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import math from 'remark-math';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

// Getting the id in the params passed to the page
export default function Article({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article>();
  const router = useRouter();
  let date;

  if (article) {
    date = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(article.createdAt));
  }

  // Fetching the article when arriving on page
  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${params.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        response = await response.json();
        setArticle({ ...response });
      } catch (error) {
        console.log(error);
        setArticle({
          title: 'Error',
          body: 'An error has occured',
          id: 0,
          img: '',
          description: '',
          createdAt: ''
        });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="section">
          <div className="content">
            {article && (
              <>
                <span className="italic">{date}</span>
                <div className={styles.separator} />
                <span className="is-size-2">{article.title}</span>
                <ReactMarkdown remarkPlugins={[gfm, math]}>
                  {article.body}
                </ReactMarkdown>
              </>
            )}

            {!article && (
              <div className="flex justify-center items-center">
                <Image
                  src="/spinner.svg"
                  width={200}
                  height={200}
                  alt="Loading spinner"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <div className="field has-addons">
              <p className="control">
                <button
                  className={`button ${styles.return}`}
                  onClick={() => router.push('/')}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </span>
                  <span>
                    <strong>Retourner à l&apos;accueil</strong>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>Made By DaWhistler - Projet La Capsule 2023</p>
        </div>
      </footer>
    </>
  );
}
