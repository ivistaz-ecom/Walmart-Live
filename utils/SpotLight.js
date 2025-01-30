import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Col, Row, Modal, Container } from "react-bootstrap";
import Link from "next/link";
import configData from "../config.json";
import { usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import { RotatingLines } from "react-loader-spinner";
import date from "date-and-time";
import Image from "next/image";

const Spotlight = () => {
  const pathname = usePathname();
  const [spotlights, setSpotlights] = useState([]); // State to store spotlight posts
  const [page, setPage] = useState(30); // Page number for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [total, setTotal] = useState(0); // Total number of posts
  const [end, setEnd] = useState(false); // Whether all posts are fetched
  const [currentProduct, setProduct] = useState(null); // Modal state
  const [currentUrl, setUrl] = useState(null); // Video URL for modal
  const [currentTitle, setTitle] = useState(null); // Modal title

  const [fetchedPosts, setFetchedPosts] = useState(new Set()); // Track fetched posts' IDs

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);

    try {
      let server;

      // Determine the server based on domain
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

      // Fetch spotlight posts
      const response = await fetch(
        `${configData.SERVER_URL}msme_spotlight?_embed&status=publish&production[]=${server}&per_page=${page}`
      );
      const spotlightsData = await response.json();

      if (spotlightsData.length === 0) {
        setEnd(true); // End of posts, display "No more posts" message
      } else {
        // Filter out already fetched posts
        const newSpotlights = spotlightsData.filter(
          (post) => !fetchedPosts.has(post.id)
        );

        if (newSpotlights.length > 0) {
          // Append new posts to the existing ones
          setSpotlights((prevSpotlights) => [
            ...prevSpotlights,
            ...newSpotlights,
          ]);
          newSpotlights.forEach((post) => {
            fetchedPosts.add(post.id); // Mark posts as fetched
          });
        }

        setTotal(spotlightsData.length); // Update the total count
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [page, fetchedPosts]);

  const debouncedFetchContent = useCallback(debounce(fetchContent, 500), [
    page,
  ]);

  useEffect(() => {
    fetchContent();
    debouncedFetchContent();
  }, [page, debouncedFetchContent]);

  const loadMore = () => {
    if (spotlights.length >= total) {
      setEnd(true); // Stop loading if we have fetched all posts
      return;
    }
    setPage((oldPage) => oldPage + 4); // Increment page number for pagination
  };

  return (
    <div>
      {/* Modal for displaying video content */}
      <Modal
        show={currentProduct}
        onHide={() => setProduct(null)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title dangerouslySetInnerHTML={{ __html: currentTitle }} />
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="400"
            src={currentUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>

      {/* Spotlight Content Display */}
      <Container style={{ background: "#dee2e6" }} fluid>
        <Container>
          <Row className="pt-5">
            {spotlights.map((post, index) => (
              <Col sm={4} className="p-3" key={post.id}>
                <Card className="webinar_post">
                  {post["_embedded"]["wp:featuredmedia"][0]["source_url"] && (
                    <Image
                      src={post["_embedded"]["wp:featuredmedia"][0]["source_url"]}
                      alt={post["title"]["rendered"]}
                      className="img-hover webimg img-fluid"
                      width={500}
                      height={500}
                      onClick={() => {
                        setProduct(post.id);
                        setUrl(post.acf.video_url);
                        setTitle(post.title.rendered);
                      }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title
                      className="fs-3 bogle-medium walmart-default"
                      style={{ minHeight: 110 }}
                      dangerouslySetInnerHTML={{
                        __html: post["title"]["rendered"],
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post["acf"]["short_decription"],
                      }}
                      style={{ minHeight: 180 }}
                    />
                    <div style={{ minHeight: 190 }}>
                      <Button variant="primary" className="pri-category mb-3">
                        {post["acf"]["category"]}
                      </Button>
                      <h3 className="fs-5 bogle-medium mb-1">
                        {post["acf"]["expert_name"]}
                      </h3>
                      <h3 className="fs-6 mb-3">
                        {post["acf"]["expert_designation"]}
                      </h3>
                      <h3 className="fs-5 bogle-medium mb-1 ">
                        {post["acf"]["expert_name_copy"]}
                      </h3>
                      <h3 className="fs-6 mb-3 ">
                        {post["acf"]["expert_designation_copy"]}
                      </h3>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>

      {/* Loading Spinner and Load More Button */}
      <section
        className="section text-center mb-3 pb-5"
        style={{ background: "#dee2e6" }}
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
              <p>No more posts to load</p> // Show message when all posts are loaded
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

export default Spotlight;
