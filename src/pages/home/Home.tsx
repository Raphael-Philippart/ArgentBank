import React, {useEffect} from 'react';
import HomeHeader from "../../components/uix/home/header/HomeHeader";
import Features from "../../components/uix/home/features/Features";
import {selectUserProfile} from "../../store/selectors/authSelectors";
import {fetchUserProfile} from "../../store/actions/authActions";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector(selectUserProfile);

  useEffect(() => {
    if (!userProfile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userProfile]);

  return <div className={'Home'}>
    <HomeHeader/>
    <Features/>
  </div>
};

export default Home;
