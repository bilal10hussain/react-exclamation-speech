import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faSearch, faRedo } from '@fortawesome/free-solid-svg-icons'

const COLORS = {
    "white": "#fff",
    "black": "#000",
    "start": "#006B1F",
    "startHover": "#008527",
    "search": "#732f60",
    "searchHover": "#993e80",
};

const SIZES = {
    desktop: 992,
    tablet: 768,
    phone: 576,
};

const media = Object.keys(SIZES).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (min-width: ${SIZES[label] / 16}em) {
            ${css(...args)}
        }
    `;

    return acc;
}, {});

const Page = styled.div`
    margin: 10px;

    ${media.phone`
        margin: 75px auto 0 auto;
        position: relative;
        width: 500px;    
    `}
`;

const SpeechText = styled.p`
    text-transform: uppercase;
    margin: 0 0 40px;
`;

const ButtonSet = styled.div`
    margin: 15px 0;
`;

const Button = styled.button`
    cursor: pointer;
    background-color: ${COLORS.white};
    border: 0 none;
    border-radius: 3px;
    margin: 0 10px 0 0;
    padding: 10px 30px;

    ${media.phone`
        padding: 15px 45px;    
    `};
    
    &[disabled] {
        cursor: default;
        opacity: 0.25;
    }
    
    &:last-child {
        margin-right: 0;
    }
    
    ${props => props.kind === "start" && css`
        background-color: ${COLORS.start};
        color: ${COLORS.white};

        &:hover {
            background-color: ${COLORS.startHover};
        }
    `}
    
    ${props => props.kind === "search" && css`
        background-color: ${COLORS.search};
        color: ${COLORS.white};
        
        &:hover {
            background-color: ${COLORS.searchHover};
        }
    `}
    
    ${props => props.kind === "reset" && css`
        border: 1px solid rgba(0, 0, 0, 0.75);
    `}
`;

const SearchTitle = styled.h1`
    font-size: 18px;
    margin: 40px 0;
`;

const SearchKeyword = styled.span`
    color: rgba(0, 0, 0, 0.4);
`;



const OPTIONS = {
    autoStart: false
};

const noSupport = () => {
    console.error("Sorry, this browser does not support speech recognition");

    return (
        <Page>
            <h1>
                Sorry, this browser does not support speech recognition
            </h1>
        </Page>
    )
};

function renderLayout(transcript, startListening, stopListening, resetTranscript) {
    const [playing, setPlaying] = useState(false);
    const [result, setResult] = useState("");

    useEffect( () => {
        onSearch();
    }, [result]);

    function onStart () {
        setPlaying(true);
        startListening();
    }

    function onSearch () {
        setPlaying(false);
        stopListening();
        setResult(transcript);
    }

    function onReset () {
        if (transcript) {
            resetTranscript();
            setResult("");
        }

        if (playing) {
            stopListening();
            setPlaying(false);
        }
    }

    function renderText () {
        return (
            <SpeechText>
                <strong>Text</strong> <br/>
                {transcript.length > 0 ? `${transcript}!` : null}
            </SpeechText>
        )
    }

    function renderButtons () {
        return (
            <ButtonSet>
                <Button kind="start" onClick={onStart} disabled={playing}>
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
                <Button kind="search" onClick={onSearch} disabled={!playing || !transcript}>
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
                <Button kind="reset" onClick={onReset} disabled={!playing && !transcript}>
                    <FontAwesomeIcon icon={faRedo} />
                </Button>
            </ButtonSet>
        )
    }

    function renderSearchResults () {
        if (!result) return;

        return (
            <SearchTitle>
                You've searched for: <SearchKeyword>{result.toUpperCase()}</SearchKeyword>!
            </SearchTitle>
        )
    }

    return (
        <Page>
            {renderText()}
            {renderButtons()}
            {renderSearchResults()}
        </Page>
    )
}

function Dictaphone (props) {
    const {
        transcript,
        resetTranscript,
        startListening,
        stopListening,
        browserSupportsSpeechRecognition
    } = props;

    if (!browserSupportsSpeechRecognition) {
        return (
            noSupport()
        )
    }

    return (
        renderLayout(transcript, startListening, stopListening, resetTranscript)
    )
}

Dictaphone.propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
};

Button.propTypes = {
    kind: PropTypes.string
};

export default SpeechRecognition(OPTIONS)(Dictaphone);
