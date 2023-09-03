import React from 'react';
import tmdbConfigs from '../api/config/tmdbConfigs';
import Container from '../components/common/Container';
import HeroSlide from '../components/common/HeroSlide';
import MediaSlide from '../components/common/MediaSlide';

const Home = () => {
    return (
        <div className="w-full h-full min-h-screen">
            <HeroSlide
                mediaType={tmdbConfigs.mediaType.movie}
                mediaCategory={tmdbConfigs.mediaCategory.popular}
            />
            <div className="flex flex-col gap-20 last-of-type: mb-40">
                <Container header="popular movies">
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.movie}
                        mediaCategory={
                            tmdbConfigs.mediaCategory.popular
                        }></MediaSlide>
                </Container>
                <Container header="popular series">
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.tv}
                        mediaCategory={
                            tmdbConfigs.mediaCategory.popular
                        }></MediaSlide>
                </Container>
                <Container header={'top rated movies'}>
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.movie}
                        mediaCategory={
                            tmdbConfigs.mediaCategory.top_rated
                        }></MediaSlide>
                </Container>

                <Container header={'top rated series'}>
                    <MediaSlide
                        mediaType={tmdbConfigs.mediaType.tv}
                        mediaCategory={
                            tmdbConfigs.mediaCategory.top_rated
                        }></MediaSlide>
                </Container>
            </div>
        </div>
    );
};

export default Home;
