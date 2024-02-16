"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Article } from "@/types/Article";
import Image from "next/image";
import Pagination from "./Pagination";

export function ArticlesList() {
  const [list, setList] = useState<Article[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetching all the articles
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page: number) => {};

  return (
    <>
      <h2 className="is-size-3 mb-4">Les articles</h2>

      <div className="columns is-multiline mb-4">
        {list &&
          list.map((article: Article, i) => {
            return (
              <div key={i} className="column is-one-third">
                <ArticleCard {...article} image={article.img} />
              </div>
            );
          })}

        {!list && (
          <div className="column">
            <Image
              src="/spinner.svg"
              width={200}
              height={200}
              alt="Loading spinner"
              style={{ margin: "0 auto" }}
            />
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
