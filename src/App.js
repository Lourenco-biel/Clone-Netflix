import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/Featured/FeaturedMovie';
import Header from './components/Header/Header'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await tmdb.getHomeList()
      setMovieList(list)

     //Pegando o Featured 
     let originals = list.filter(i=>i.slug === 'originals');
     let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
     let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(() =>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader (true)
      }else{
        setBlackHeader (false)
      }
      
    }

    window.addEventListener('scroll', scrollListener)

    return()=>{
      window.removeEventListener('scroll', scrollListener)
    }
  }, []);


  return (
    <div className="page">

    <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
          <footer>
            Feito com carinho por mim Gabriel<span> ❤ </span><br/>
            Direitos de Imagem para Netflix<br/>
            Dados pegos do site Themoviedb.org
          </footer>

          {movieList.length <= 0 &&
          <div className='loading'>
          <img src='https://i0.wp.com/66.media.tumblr.com/5bf8ba688ff3553b900a40dad2bbc1e0/tumblr_inline_p7qvpcxHIr1seki23_500.gif?resize=500%2C250&ssl=1' alt='Loanding'/>
          </div>
        }
    </div>
  );

}
