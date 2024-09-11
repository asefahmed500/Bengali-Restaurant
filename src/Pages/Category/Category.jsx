import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../../components/sectiontitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle

            Headings="Order From Online "

            Subheadigs="From 11:00am to 10:00pm"
            
            >
                
            </SectionTitle>
            <div>
                <Swiper className='mb-24'
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide><img src={slide1} alt="" />
                        <h3 className='text-2xl uppercase text-center -mt-12'>Salads</h3>
                    </SwiperSlide>
                    <SwiperSlide><img src={slide2} alt="" />
                        <h3 className='text-2xl text-white uppercase text-center -mt-12'>Pizza</h3>
                    </SwiperSlide>
                    <SwiperSlide><img src={slide3} alt="" />
                        <h3 className='text-2xl uppercase text-center -mt-12'>Soup</h3></SwiperSlide>
                    <SwiperSlide><img src={slide4} alt="" />
                        <h3 className='text-2xl uppercase text-center -mt-12'>Desert</h3></SwiperSlide>
                    <SwiperSlide><img src={slide5} alt="" />
                        <h3 className='text-2xl uppercase text-center -mt-12'>Salads</h3></SwiperSlide>

                </Swiper>
            </div>
        </section>
    );
};

export default Category;