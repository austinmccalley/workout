import * as React from 'react';
import * as style from './home.css';
import { Link } from 'react-router-dom';
import HeroImage from './../../content/images/hero.svg';
export interface HomeProps {
  // Nothing
}

export interface HomeState {
  // Nothing
}

export class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return (
      <div className={style.content}>
        <img src={HeroImage} alt="Hero Image" />
        <p>
          Connecting trainers and clients through an easy to use website.
          Clients are able to request training plans from trainers they like or
          buy a subscription based plan that trainers put out. Trainers are able
          to send custom plans to clients enitrely through the website.
        </p>

        <div className={style.buttons}>
          <button className={style.button}>
            <Link to="/signup">Sign Up</Link>
          </button>

          <button className={style.button}>
            <Link to="/plans">Plans</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
