import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaChevronCircleRight } from "react-icons/fa";
import { FaArrowRightLong, FaMagnifyingGlass } from "react-icons/fa6";

const BlogsRight = ({ data }) => {
  return (
    <>
      <aside className="col-lg-4">
        <div className="cs_height_0 cs_height_lg_50" />
        <div className="cs_sidebar cs_style_1">
          {/* Search */}
          <div className="cs_sidebar_widget cs_radius_15 cs_search">
            <input type="text" placeholder={data.searchPlaceholder} />
            <span className="cs_search_icon cs_blue_bg cs_white_color">
              <i>
                <FaMagnifyingGlass />
              </i>
            </span>
          </div>

          {/* Service */}
          <div
            className="cs_sidebar_widget cs_service cs_bg_filed"
            style={{
              backgroundImage: `url(${data.service.backgroundImage})`,
            }}
          >
            <div className="cs_iconbox cs_style_11">
              <div className="cs_iconbox_icon cs_center">
              <Image src={data.service.icon} alt="img" width={33} height={30}   />
              </div>
              <h3 className="cs_iconbox_title cs_white_color">
                {data.service.title}
              </h3>
              <p className="cs_iconbox_subtitle cs_white_color">
                {data.service.subtitle}
              </p>
              <Link href={data.service.link} className="cs_iconbox_btn cs_center">
                <i>
                  <FaChevronCircleRight />
                </i>
              </Link>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="cs_sidebar_widget cs_radius_15">
            <h3 className="cs_sidebar_title">Recent Post</h3>
            {data.recentPosts.map((post, index) => (
              <div key={index} className="cs_post cs_style_2">
                <Link
                  href={post.link}
                  className="cs_post_thumb_thumbnail cs_type_2 cs_zoom"
                >
                  <Image src={post.imgSrc} alt="img" className="cs_zoom_in" width={94} height={78}   />
                </Link>
                <div className="cs_post_info">
                  <div className="cs_post_meta">
                    <i>
                      {" "}
                      <FaCalendarAlt />
                    </i>{" "}
                    {post.date}
                  </div>
                  <h3 className="cs_post_title mb-0">
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="cs_sidebar_widget cs_radius_15">
            <h3 className="cs_sidebar_title">{data.secTitle}</h3>
            <ul className="cs_categories cs_mp0">
              {data.categories.map((category, index) => (
                <li key={index}>
                  <Link href={category.link}>
                    <i>
                      <FaArrowRightLong />
                    </i>{" "}
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="cs_sidebar_widget cs_radius_15">
            <div className="cs_sidebar_tags">
              <h3 className="cs_sidebar_title">{data.secTitle2}</h3>
              <div className="cs_tag_list">
                {data.tags.map((tag, index) => (
                  <Link key={index} href={tag.tagUrl} className="cs_tag_link">
                    {tag.tagTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BlogsRight;
