import Card from "./Card.component";

const Cards = ({ sectionTitle, cardSize, videoArr = [] }) => {
    if (videoArr.length === 0) return <h1>Error fetching youtube data</h1>;
    const outputJsx = videoArr.map((videoObj, idx) => {
        let imgUrl;
        if (videoObj.video_id) {
            imgUrl = `https://i.ytimg.com/vi/${videoObj.video_id}/maxresdefault.jpg`;
        } else {
            imgUrl =
                "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
        if (videoObj.video_id)
            return (
                <Card
                    key={idx}
                    id={videoObj.video_id}
                    sideEl={idx === 0 || idx === videoArr.length - 1}
                    size={cardSize}
                    imgUrl={imgUrl}
                />
            );
    });

    return (
        <section className='cards _container'>
            <div className='cards__title'>{sectionTitle}</div>
            <div className='cards__wrapper'>
                <div className='cards__container'>{outputJsx}</div>
            </div>
        </section>
    );
};

export default Cards;
