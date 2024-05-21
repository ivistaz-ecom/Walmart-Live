import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image'
import Header from '../components/Header';
import Brand from '../components/BrandLogo';
import Footer from '../components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link'
import NewsLetter from '../components/NewsLetter'
import Floating from '../components/FloatingMenu'
import Popups from '../components/PopUps'
import Head from 'next/head';

function ContainerExample() {

  const title = "About us  - Walmart Vriddhi";
  const desc = "About Walmart Vriddhi Walmart and Flipkart have made a long-term commitment to transform India’s MSME ecosystem by empowering 50,000 MSMEs. We strive to play a catalytic role by supporting small businesses with growth opportunities to reach greater heights and new markets. Walmart Vriddhi is a supplier development program tailored to help MSMEs modernize";
  const banner = '/images/banner_about.jpeg';
  const url = 'https://www.walmartvriddhi.org/about-us/';

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "walmartvriddhi",
    "url": "https://www.walmartvriddhi.org/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}{search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="robots" content="index,follow"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="canonical" href={url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />
        <meta property="article:modified_time" content="2023-07-06T15:35:40+00:00" />
        <meta property="og:image" content={banner} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Header />
      <Image
        src={banner}
        width="800"
        height="620"
        background='no-repeat'
        background-size='cover'
        className="banner-img w-100 h-100"

      />
      <Brand />
      <Container>
        <Row>
          <Col className="text-center">
            <h1 className="fs-1 bogle-medium walmart-default mt-4">About Walmart Vriddhi</h1>

            <p className="col-md-8 mx-auto text-center fs-4">Walmart and Flipkart have made a long-term commitment to transform India’s MSME ecosystem by empowering 50,000 MSMEs. We strive to play a catalytic role by supporting small businesses with growth opportunities to reach greater heights and new markets.

            </p>

          </Col>
        </Row>
      </Container>
      <Container className="wbg-main p-4">
        <Row>
          <Col className="text-center text-white">
            <p className="col-md-8 mx-auto text-center fs-4">Walmart Vriddhi is a supplier development program tailored to help MSMEs modernize, scale and meet their domestic ambitions. By doing this, Walmart Vriddhi is unlocking India’s entrepreneurial capacity and enabling MSMEs to thrive in the marketplace. The program also helps MSMEs with tools to potentially become a part of the supply chains of the Flipkart Marketplace, Flipkart Wholesale ecosystem or those of other domestic companies.</p>

          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <Card className="rounded-0 border-0 card-logo mb-2">
              <Card.Body className="about-card-body">
                <Image
                  src="/images/flipkart-1.png"
                  alt='flipkart'
                  width={200}
                  height={200}
                  className="img-fluid"

                />
                <div className="card-hover text-white fs-5 text-center">The Flipkart Group is one of India’s digital commerce leaders and includes group companies like Flipkart, Flipkart Wholesale, and Myntra.</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <Card className="rounded-0 border-0 card-logo mb-2">
              <Card.Body className="about-card-body">

                <Image
                  src="/images/flipkart-wholesale.png"
                  alt='flipkart wholesale'
                  width={200}
                  height={200}
                  className="img-fluid"

                />
                <div className="card-hover text-white fs-5 text-center">Flipkart Wholesale is transforming the Kirana retail ecosystem in India by leveraging cutting-edge and locally developed technology.</div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card className="rounded-0 border-0 card-logo">
              <Card.Body className="about-card-body">

                <Image
                  src="/images/Walmart-Marketplace.png"
                  alt='walmart market place'
                  width={200}
                  height={200}
                  className="img-fluid"

                />
                <div className="card-hover text-white fs-5 text-center">Walmart Marketplace allows third-party sellers to list their items on Walmart’s website. MSMEs have the unique opportunity to reach over 100 million unique Walmart.com visitors each month.</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="pb-5">
        <Row className="align-items-center about-section text-white fs-5 m-padding-bottom">
          <Col xs={12} sm={6}>
            <Image
              src="/images/white-logo-swasti.png"
              alt='swasti'
              width={200}
              height={100}
              className="img-fluid"

            />
            <p className="mb-5 mx-3" style={{ color: '#E1E1E1' }}>Swasti, a member of the Catalyst family, was founded in 2004. Swasti co-designs demonstrable and scalable solution models for businesses in partnership with communities on the ground and influences policies nationally and internationally. Swasti is helping communities, governments, and partners shape safe, secure, healthy and more prosperous lives across the world through various initiatives that reach over 400,000 people.
              Over the past eight years, Walmart and Swasti have shared a meaningful partnership which now includes the Walmart Vriddhi program.</p>
            <Link href="https://swastihc.org/" target="_blank" className="ab-button mb-4 mt-5 bogle-medium mx-5">Know more</Link>
          </Col>
          <Col className="p-0 d-flex justify-content-end">

            <Image
              src="/images/about-us.png"
              alt='walmart about us'
              width={600}
              height={600}

              className="ab-image m-tm-none img-fluid"
            />
          </Col>
        </Row>

      </Container>
      <Popups />
      <Floating />
      <NewsLetter />
      <Footer />

    </>
  );
}

export default ContainerExample;