import Card from "./Card.component";

const Cards = ({ sectionTitle, cardSize, videoArr = [] }) => {
    if (videoArr.length === 0) return <h1>Error fetching youtube data</h1>;
    const outputJsx = videoArr.map((videoObj, idx) => {
        return (
            <Card
                key={idx}
                id={videoObj.id}
                sideEl={idx === 0 || idx === videoArr.length - 1}
                size={cardSize}
                imgUrl={videoObj.imgUrl}
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
