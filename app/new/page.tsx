import { MarkdownEditor } from '@/components/MarkdownEditor';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function newArticle() {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <h1 className="is-size-3 mb-5">
          C&apos;est le début d&apos;une nouvelle histoire
        </h1>
        <div className="block">
          <p className="has-text-justified">
            Écrivez votre article ici, et attention aux fautes
            d&apos;orthographe !
          </p>
        </div>

        <div className="block">
          <MarkdownEditor />
        </div>
      </main>

      <Footer />
    </>
  );
}
