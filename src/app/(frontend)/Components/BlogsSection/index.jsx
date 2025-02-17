"use client"
import Slider from "react-slick";
import Button from "../Buttons";
import { FaAngleRight } from "react-icons/fa6";
import SectionHeading from "../SectionHeading";
import Link from "next/link";
import Image from "next/image";

const BlogSection = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    fade: false,
    swipeToSlide: true,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    dotsClass: "cs_pagination cs_style_2",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container">
        <SectionHeading
          SectionSubtitle={data.sectionTitle}
          SectionTitle={data.sectionSubtitle}
          variant={"text-center"}
        />

        <div className="cs_height_50 cs_height_lg_50" />
        <div className="cs_slider cs_style_1 cs_slider_gap_24">
          <div className="cs_slider_container">
            <div className="cs_slider_wrapper">
              <Slider {...settings}>
                {data.postsData.map((post, index) => (
                  <div key={index} className="cs_slide">
                    <article className="cs_post cs_style_1">
                      <Link
                        href={post.postLink}
                        className="cs_post_thumbnail position-relative"
                      >
                        <Image src={post.thumbnail} alt="img" width={396} height={280}   />
                        <div className="cs_post_category position-absolute">
                          {post.category}
                        </div>
                      </Link>
                      <div className="cs_post_content position-relative">
                        <div className="cs_post_meta_wrapper">
                          <div className="cs_posted_by cs_center position-absolute">
                            {post.date}
                          </div>
                          <div className="cs_post_meta_item">
                          <Image src={post.authorIcon} alt="img" width={15} height={14}   />
                            <span>By: {post.author}</span>
                          </div>
                          <div className="cs_post_meta_item">
                          <Image src={post.commentIcon} alt="img" width={14} height={13}   />
                            <span>Comment</span>
                          </div>
                        </div>
                        <h3 className="cs_post_title">
                          <Link href={post.postLink}>{post.title}</Link>
                        </h3>
                        <p className="cs_post_subtitle">{post.subtitle}</p>

                        <Button
                          variant={"cs_post_btn"}
                          btnIcons={<FaAngleRight />}
                          btnUrl={post.postLink}
                          btnText={post.btnText}
                        />

                        <div className="cs_post_shape position-absolute" />
                      </div>
                    </article>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
