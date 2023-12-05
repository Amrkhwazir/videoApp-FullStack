import React from 'react'
import styled from 'styled-components'
import vtubeLogo from "../image/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import { AccountCircleOutlined, ExploreOutlined, FlagOutlined, GamesOutlined, HelpOutlineOutlined, HistoryOutlined, LiveTvOutlined, MovieCreationOutlined, MusicNoteOutlined, NewspaperOutlined, SettingsBrightnessOutlined, SettingsOutlined, SportsBaseballOutlined, SubscriptionsOutlined, VideoLibraryOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';


const Container = styled.div`
    flex: 1;
    background-color: ${({theme}) => theme.bgLighter};
    height: 100%;
    color: ${({theme}) => theme.text};
    font-size: 12px;
    position: sticky;
    top: 0;
`
const Wrapper = styled.div`
    padding: 18px 26px;
`
const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px
`;
const Img = styled.img`
    height: 25px;
`;
const Items = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 7.5px 5px;

    &:hover{
        background-color: ${({theme}) => theme.soft};
        color: ${({theme}) => theme.hoverColor};
    }
`;
const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`;
const Login = styled.div`
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.soft};
    margin-bottom: 20px;
`

export default function Menu({setDarkMode, darkMode}) {

    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());

    }

  return (
    <Container>
        <Wrapper>
        <Link to="/" style={{textDecoration: "none", color: 'inherit'}}>
        <Logo>
        <Img src={vtubeLogo}/>
        VTube
        </Logo>
        </Link>
            <Items>
                <HomeIcon/>
                Home
            </Items>
            <Link to="trends" style={{textDecoration: "none", color: "inherit"}}>
            <Items>
                <ExploreOutlined/>
                Explore
            </Items>
            </Link>
            <Link to="subscriptions" style={{textDecoration: "none", color: "inherit"}}>
            <Items>
                <SubscriptionsOutlined/>
                Subscriptions
            </Items>
            </Link>
            <Hr/>
            <Items>
                <VideoLibraryOutlined/>
                Library
            </Items>
            <Items>
                <HistoryOutlined/>
                History
            </Items>
            <Hr/>
            
            {!currentUser && <> 
                <Login>
                sign in to like videos, comment, and subscribe.
                <Link to="signin" style={{textDecoration: "none"}}>
                <Button> <AccountCircleOutlined/> SIGN IN</Button>
                </Link>
            </Login>
            <Hr/>
            </>}
            
            <Title>BEST OF VTUBE</Title>
            <Items>
                <MusicNoteOutlined/>
                Music
            </Items>
            <Items>
                <SportsBaseballOutlined/>
                Sport
            </Items>
            <Items>
                <GamesOutlined/>
                Gaming
            </Items>
            <Items>
                <MovieCreationOutlined/>
                Movies
            </Items>
            <Items>
                <NewspaperOutlined/>
                News
            </Items>
            <Items>
                <LiveTvOutlined/>
                Live
            </Items>
            <Hr/>
            <Items>
                <SettingsOutlined/>
                Setting
            </Items>
            <Items>
                <FlagOutlined/>
                Report
            </Items>
            <Items>
                <HelpOutlineOutlined/>
                Help
            </Items>
            <Items onClick={()=> setDarkMode(!darkMode)}>
                <SettingsBrightnessOutlined/>
               {!darkMode ? "Dark Mode" : "Light Mode"}
            </Items>
        
                <Button onClick={logoutHandler}>Logout</Button>

        </Wrapper>
    </Container>
  )
}
