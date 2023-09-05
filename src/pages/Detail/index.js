import FullViewBannerTrailer from '~/components/FullViewBannerTrailer';
import MovieScheduleItem from '~/components/MovieItem/MovieScheduleItem';
import TitleHeadingPage from '~/components/TitleHeadingPage';

const firstSection = [
    {
        title: 'detail',
        size: 40,
    },
    {
        title: 'storyline',
        size: 60,
    },
];
function Detail() {
    return (
        <div>
            <FullViewBannerTrailer />

            <div style={{ width: '100%', boxSizing: 'border-box' }}>
                <MovieScheduleItem />
            </div>

            {/* <TitleHeadingPage titles={firstSection} /> */}
        </div>
    );
}

export default Detail;
