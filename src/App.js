import { useEffect, useState } from "react";
import { WinnerModal } from "./components/WinnerModal";
import { MyCard } from "./components/UI/MyCard";
import { MyButton } from "./components/UI/MyButton";

const cardsPool = [
  {id: 1, name: 'Jotaro', turned: false, img: 'https://animego.org/media/cache/thumbs_250x350/upload/character/5cc48cb86f1de071083123.jpg'},
  {id: 2, name: 'Jotaro', turned: false, img: 'https://animego.org/media/cache/thumbs_250x350/upload/character/5cc48cb86f1de071083123.jpg'},
  {id: 3, name: 'Dio', turned: false, img: 'https://cs12.pikabu.ru/post_img/2022/08/29/4/1661749557178174151.jpg'},
  {id: 4, name: 'Dio', turned:false, img: 'https://cs12.pikabu.ru/post_img/2022/08/29/4/1661749557178174151.jpg'},
  {id: 5, name: 'Josuke', turned: false, img: 'https://external-preview.redd.it/gybhpiQWNb44_BQV0FbDHMMzVZjvj9EcEtU-pvndbSE.jpg?width=640&crop=smart&auto=webp&s=bf1c31ad5dfc898c94cda650014a602d95667163'},
  {id: 6, name: 'Josuke', turned: false, img: 'https://external-preview.redd.it/gybhpiQWNb44_BQV0FbDHMMzVZjvj9EcEtU-pvndbSE.jpg?width=640&crop=smart&auto=webp&s=bf1c31ad5dfc898c94cda650014a602d95667163'},
  {id: 7, name: 'Jolyne', turned: false, img: 'https://thicc.mywaifulist.moe/waifus/1346/ee67d282722c086ce9300d25810ff04f67c2490f694ef893b402e42d21a3e7ef_thumb.jpg'},
  {id: 8, name: 'Jolyne', turned: false, img: 'https://thicc.mywaifulist.moe/waifus/1346/ee67d282722c086ce9300d25810ff04f67c2490f694ef893b402e42d21a3e7ef_thumb.jpg'},
  {id: 9, name: 'Diavolo', turned: false, img: 'https://wikiwarriors.org/mediawiki/images/1/11/Diavolo.png'},
  {id: 10, name: 'Diavolo', turned: false, img: 'https://wikiwarriors.org/mediawiki/images/1/11/Diavolo.png'},
  {id: 11, name: 'Bucciarati', turned: false, img: 'https://shikimori.one/system/characters/original/13045.jpg'},
  {id: 12, name: 'Bucciarati', turned: false, img: 'https://shikimori.one/system/characters/original/13045.jpg'},
  {id: 13, name: 'Speedwagon', turned: false, img: 'https://i.pinimg.com/736x/d4/7c/20/d47c20ddd32f4f2a6cb5baf425a38d05.jpg'},
  {id: 14, name: 'Speedwagon', turned: false, img: 'https://i.pinimg.com/736x/d4/7c/20/d47c20ddd32f4f2a6cb5baf425a38d05.jpg'},
  {id: 15, name: 'Jorno', turned: false, img: 'https://static.displate.com/857x1200/displate/2021-09-20/4c973fea8f791c3a820a20b25353c45d_6325d6e725fd14ae0ae718e27e8541f4.jpg'},
  {id: 16, name: 'Jorno', turned: false, img: 'https://static.displate.com/857x1200/displate/2021-09-20/4c973fea8f791c3a820a20b25353c45d_6325d6e725fd14ae0ae718e27e8541f4.jpg'},
] 

function App() {

  const [cards, setCards] = useState([]);
  const [choice, setChoice] = useState({firstCard: '', firstCardId: ''})
  const [pointerEvent, setPointerEvent] = useState('auto');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const newCards = cardsPool.sort(() => Math.random() - 0.5)
    setCards(newCards);
  }, [])

  const startCompare = (selectedCard) => {
    if (choice.firstCard) {
      if (choice.firstCard !== selectedCard.name) {
        setCards(cards.map((el) => choice.firstCardId == el.id || selectedCard.id == el.id ? {...el, turned: false} : el))
        setChoice({...choice, firstCard: '', firstCardId: ''})
     }
      else {
        setChoice({...choice, firstCard: '', firstCardId: ''})
      }
      setPointerEvent('auto');
   }
  }


  const click = (id) => {

    const selectedCard = cards.find((card) => card.id === id);
    setCards(cards.map((el) => el.id === id ? {...el, turned: true} : el))

     if(choice.firstCard) {
       setPointerEvent('none');
       setTimeout(() => startCompare(selectedCard), 1000)
     }
      else { 
        setChoice({...choice, firstCard: selectedCard.name, firstCardId: selectedCard.id})
      }
     if (cards.filter(el => !el.turned).length - 1 === 0) {
      setModal(true)
     }
  }

  const restartGame = () => {
    setCards(cards.map((el) => ({...el, turned: false})).sort(() => Math.random() - 0.5))
    setModal(false);
  }

  return (
    <div className="App">
      <div className="container">
        <WinnerModal visible={modal} setVisible={setModal}>
          You win!
          <MyButton onClick={restartGame}> Play again</MyButton> 
        </WinnerModal>
        {cards.map((card) => (
        <MyCard 
        pointerEvent={pointerEvent}
        key={card.id}
        onClick={() => click(card.id)}
        src={card.img}
        name={card.name}
        turned={card.turned}
        >
        </MyCard>
        ))}
      </div>
    </div>
  );
};

export default App;
