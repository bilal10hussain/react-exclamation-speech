import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import styled, { css } from "styled-components";

const COLORS = {
    "white": "#fff",
    "black": "#000",
    "red": "red",
    "green": "green"
};

const Page = styled.div`
    margin: 75px auto 0 auto;
    position: relative;
    width: 500px;
`;

const SpeechText = styled.p`
    text-transform: uppercase;
    margin: 0 0 40px;
`;

const ButtonSet = styled.div`
    margin: 15px 0;
`;

const Button = styled.button`
    background-color: ${COLORS.white};
    border: 1px solid ${COLORS.black};
    border-radius: 3px;
    cursor: pointer;
    padding: 15px 45px;
    margin-right: 15px;
    
    &:last-child {
        margin-right: 0;
    }
    
    ${props => props.kind === "start" && css`
        background-color: ${COLORS.green};
        color: ${COLORS.white};
    `}
    
    ${props => props.kind === "stop" && css`
        background-color: ${COLORS.red};
        color: ${COLORS.white};
    `}
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

const renderLayout = (transcript, startListening, stopListening, resetTranscript) => (
    <Page>
        <SpeechText>
            <strong>Text:</strong> <br/>
            {transcript}
        </SpeechText>

        <ButtonSet>
            <Button kind="start" onClick={startListening}>Start</Button>
            <Button kind="stop" onClick={stopListening }>Stop</Button>
            <Button onClick={resetTranscript}>Reset</Button>
        </ButtonSet>
    </Page>
);

const Dictaphone = (props) => {
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
};

Dictaphone.propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
};

export default SpeechRecognition(OPTIONS)(Dictaphone);
