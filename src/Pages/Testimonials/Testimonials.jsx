import SectionTitle from "../../components/sectiontitle/SectionTitle";

import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

const Testimonials = () => {

    const [reviews, setReviews] = useState([])
    useEffect(() => {

        fetch('https://resturant-server-two.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])
    return (
        <section className="my-20">
            <SectionTitle
                Subheadigs="What Our Clients Say"
                Headings="TESTIMONIALS"

            >

            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className=" flex flex-col items-center  mx-16 my-24">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.details}</p>
                            <h3 className="text-2xl text-orange-400 uppercase"    >{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>

        </section>
    );
};

export default Testimonials;