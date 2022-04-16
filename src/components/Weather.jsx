import React, { useEffect, useState } from "react";
//styles
import styled from "styled-components";
//animations
import { motion } from "framer-motion";
//axios
import axios from "axios";

function Weather() {
    const [weather, setWeather] = useState({});
    const [location, setLocation] = useState("");
    const [inputText, setInputText] = useState("");

    const setLocationHandler = (e) => {
        setLocation(inputText);
    };

    const setInputTexts = (e) => {
        setInputText(e.target.value);
    };

    const resetLocationHandler = () => {
        setInputText("");
        setWeather({});
    };

    useEffect(() => {
        const getWeather = async () => {
            const API_KEY = process.env.REACT_APP_RECIPE_API_KEY;
            let api =
                await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}
`);
            setWeather(api.data);
        };
        getWeather();
    }, [location]);

    const convertFromKelvin = (k) => {
        const f = Math.trunc(((k - 273.5) * 9) / 5 + 32);
        return f;
    };

    console.log(weather);

    return (
        <Container
            initial={{ y: -250 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Country>
                <h1>{weather.name}</h1>
                {weather.sys ? <h3> {weather.sys.country}</h3> : null}
            </Country>
            <WeatherInfo>
                {weather.main ? (
                    <h1>{convertFromKelvin(weather.main.temp)}&#8457;</h1>
                ) : null}
                {weather.weather ? (
                    <h3>{weather.weather[0].description}</h3>
                ) : null}
            </WeatherInfo>
            <InputContainer
                initial={{ y: -250, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <input
                    type='text'
                    value={inputText}
                    onChange={setInputTexts}
                    placeholder='choose a location'
                />

                <button onClick={setLocationHandler}>
                    <span>Set Location</span>
                </button>
                <button onClick={resetLocationHandler}>
                    <span>Reset Location</span>
                </button>
            </InputContainer>
        </Container>
    );
}

const Container = styled(motion.div)`
    margin: 0 10rem;
    height: 100vh;
    margin-top: 2rem;
`;

const Country = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
        font-weight: 300;
        font-size: 1rem;
        padding-left: 0.5rem;
    }
`;

const WeatherInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2rem;
    h1 {
        font-size: 4rem;
    }
`;

const InputContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    input {
        margin: 1rem;
        padding: 1rem;
        width: 40%;
        border-radius: 10rem;
        outline: none;
    }

    button {
        position: relative;
        margin-top: 2rem;
        width: 20%;
        padding: 1rem;
        background: #000;
        color: #fff;
        transition: transform 0.5s ease;
        cursor: pointer;

        span {
            font-size: 0.8rem;
        }

        &::after,
        &::before {
            content: "";
            position: absolute;
            opacity: 0.3;
            background: #000;
            border-radius: inherit;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            z-index: -1;
            transition: transform 0.5s ease;
        }

        &:hover {
            transform: translate(-12px, -12px);
        }
        &:hover::after {
            transform: translate(6px, 6px);
        }
        &:hover::before {
            transform: translate(12px, 12px);
        }
    }
`;

export default Weather;
