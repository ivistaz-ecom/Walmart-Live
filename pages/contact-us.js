import { Container, Row, Col, Card } from "react-bootstrap";
import Image from "next/image";
import Brand from "../components/BrandLogo";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import Floating from "../components/FloatingMenu";
import Popups from "../components/PopUps";
import { NextSeo } from "next-seo";
import { usePathname } from "next/navigation";
import Head from "next/head";

function ContainerExample() {
  const pathname = usePathname();
  const title = "Contact us  - Walmart Vriddhi";
  const desc =
    "Contact us to receive tailored support for MSMEs and learn more about the program";
  const banner = "/images/alumni_profile_banner.png";
  const url = "https://www.walmartvriddhi.org/contact-us/";

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "walmartvriddhi",
    url: "https://www.walmartvriddhi.org/",
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
        <meta
          property="article:modified_time"
          content="2023-07-06T15:35:40+00:00"
        />
        <meta property="og:image" content={banner} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Header />

      <Image
        src="/images/contact_banner.jpeg"
        width="800"
        height="500"
        background="no-repeat"
        background-size="cover"
        className="banner-img w-100 h-100"
      />
      <Brand />
      <Container>
        <Row>
          <Col className="text-center">
            <p className="fs-2 bogle-medium walmart-default mt-4 pt-4">
              To learn more about the program and be part of our growth journey;
            </p>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center">
          <Col md="auto" className="text-center">
            <Card className="d-flex flex-column align-items-center rounded-0 border-0 bogle-bold">
              <Image
                src="/images/email_icon.png"
                alt="Email Icon"
                width="100"
                height="100"
              />
              <Card.Body>
                <Card.Title>email us at</Card.Title>
                <Card.Text className="bogle-medium fs-3">
                  contactus@walmartvriddhi.org
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Popups />
      <Floating />

      <Footer />
    </>
  );
}

export default ContainerExample;
