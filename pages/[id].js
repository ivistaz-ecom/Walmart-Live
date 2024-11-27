import React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Brand from '../components/BrandLogo';
import Footer from '../components/Footer';
import { Col, Container, Row, Image } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import ConfigData from "../config.json";
import NewsLetter from '../components/NewsLetter';
import Floating from '../components/FloatingMenu';
import Popups from '../components/PopUps';

const post = ({ data }) => {
  const pathname = usePathname();
  const url = `${ConfigData.WEBSITE_URL}${pathname}`;
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "walmartvriddhi",
    "url": "https://walmartvriddhi.org/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}{search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div>
      {data.map((post, index) => (
        <Head key={index}>
          <title>{post.acf.meta_title}</title>
          <meta name="description" content={post.acf.meta_description} />
          <link rel="canonical" href={`https://walmartvriddhi.org${pathname}`} />
          <meta name="keywords" content={post.acf.keywords} />
          <meta name="robots" content="index, follow" />
          {/* <div dangerouslySetInnerHTML={{ __html: post.acf.meta_robots }} /> */}
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        </Head>
      ))}
      <Header />
      <div className='grid grid-cols-3 gap-5 w-full g-0'>
        {data.map((post, index) => (
          <div key={index}>
            <Container fluid className="g-0">
              <Row className="g-0 flex-column flex-lg-row">
                <Col style={{ background: '#306FC7' }} className="d-flex flex-column justify-content-center px-2">
                  <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-white blog-head fs-1 bogle-medium" />
                </Col>
                <Col>
                  {post._embedded?.['wp:featuredmedia'][0]?.source_url && (
                    <Image
                      src={post._embedded['wp:featuredmedia'][0]['source_url']}
                      alt={post.title.rendered}
                      width="100%"
                    />
                  )}
                </Col>
              </Row>
            </Container>
            <Container className="pt-5">
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </Container>
          </div>
        ))}
      </div>
      <Popups />
      <Floating />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default post;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`${ConfigData.SERVER_URL}posts?_embed&slug=${id}`);
  const data = await res.json();
  return {
    props: { data },
    notFound: !data || data.length === 0,
  };
}
