import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Col, Row, Container, Image } from "react-bootstrap";
import Link from "next/link";
import configData from "../config.json";
import { usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import { RotatingLines } from "react-loader-spinner";
import date from "date-and-time";
import Head from "next/head";

const SuccessStories = () => {
  const pathname = usePathname();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();
  const [total, setTotal] = useState(0);
  const [end, setEnd] = useState(false);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";
  const url = `${configData.WEBSITE_URL}${pathname}`;
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "walmartvriddhi",
    "url":`${configData.WEBSITE_URL}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}{search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  const fetchContent = async () => {
    try {
      // define server
      let server;

      if (
        domain === "walmartvriddhi.org" ||
        domain === "www.walmartvriddhi.org"
      ) {
        server = `${configData.LIVE_SERVER}`;
      } else if (domain === "staging.walmartvriddhi.org") {
        server = `${configData.STAG_SERVER}`;
      } else {
        server = `${configData.STAG_SERVER}`;
      }

      // server end

      const [moviesResponse, categoriesResponse] = await Promise.all([
        fetch(
          `${configData.SERVER_URL}posts?_embed&categories[]=13&production[]=${server}&status[]=publish&per_page=${page}`
        ),
        fetch(`${configData.SERVER_URL}categories/13`),
      ]);

      const moviesData = await moviesResponse.json();
      const categoriesData = await categoriesResponse.json();

      if (moviesData.length === 0) {
        setEnd(true); // No more movies to load
      } else {
        setMovies(moviesData); // Set movies data
        setTotal(categoriesData.count); // Set total count from categories data
        setNext(categoriesData); // Update next category data
      }

      setLoading(false); // End loading state
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false); // End loading state on error
    }
  };

  // Call fetchContent whenever `page` changes
  useEffect(() => {
    fetchContent();
  }, [page]);

  const debouncedFetchContent = useCallback(debounce(fetchContent, 500), [
    page,
  ]);

  useEffect(() => {
    fetchContent();
    debouncedFetchContent();
  }, [page, debouncedFetchContent]);

  const loadMore = () => {
    if (page >= total) {
      setEnd(true);
      return;
    }

    setPage((oldPage) => oldPage + 4);
  };

  return (
    
    <div>
      <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href={`https://walmartvriddhi.org${pathname}`} />
      </Head>
      <Container style={{ background: "#dee2e6" }} fluid>
        <Container>
          <Row className="pt-5">
            {movies.map((post, index) => {
              return (
                <Col sm={4} className="p-3" key={index}>
                  <Card className="news-card">
                    {post["_embedded"]["wp:featuredmedia"][0]["source_url"] && (
                      <Image
                        src={
                          post["_embedded"]["wp:featuredmedia"][0]["source_url"]
                        }
                        alt={post["title"]["rendered"]}
                        className="news-img"
                        width={600}
                        height={230}
                      />
                    )}
                    <div className="ribbon-wrapper">
                      <div className="ribbon-edge-topleft"></div>
                    </div>

                    <Card.Body className=" new-card">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: post["acf"]["source"],
                        }}
                        className="fs-6 authors bogle-medium"
                      ></h3>
                      <h3 className="fs-6 walmart-secondary bogle-medium">
                        {date.format(new Date(post.date), "MMMM DD, YYYY")}
                      </h3>
                      <Card.Title
                        className="fs-5 bogle-medium mb-4"
                        style={{ minHeight: 80, height: 95 }}
                        dangerouslySetInnerHTML={{
                          __html: post["title"]["rendered"],
                        }}
                      />
                      <Link
                        key={index}
                        href={`${post["acf"]["source_url"]}`}
                        target="_blank"
                      >
                        <Button variant="primary" className="news_btn fs-5">
                          Read more
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>

      <section
        className="section text-center mb-3 pb-5"
        style={{ background: "#dee2e6" }}
        fluid
      >
        {loading ? (
          <RotatingLines
            visible={true}
            height="30"
            width="30"
            color="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            strokeColor="green"
            wrapperClass=""
          />
        ) : (
          <div className="loadmodediv">
            {end ? (
              <h2 className="mt-4 text-center">No more posts to Load</h2>
            ) : (
              <Button
                variant="primary"
                className="authors_btn fs-5"
                onClick={loadMore}
              >
                Load more
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default SuccessStories;
