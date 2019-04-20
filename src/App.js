import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

import "./App.css";



const options = {
    autoStart: false
};

const Dictaphone = ({
        transcript,
        resetTranscript,
        startListening,
        stopListening,
        browserSupportsSpeechRecognition
    }) => {
        if (!browserSupportsSpeechRecognition) {
            console.error("Sorry, this browser does not support speech recognition");

            return (
                <div className="page">
                    <h1>
                        Sorry, this browser does not support speech recognition
                    </h1>
                </div>
            )
        }

        return (
            <div className="page">
                <p className="speech__text">
                    <strong>Text:</strong> <br/>
                    {transcript}
                </p>

                <button className="btn btn__start" onClick={startListening}>Start</button>
                <button className="btn btn__stop" onClick={stopListening }>Stop</button>
                <button className="btn" onClick={resetTranscript}>Reset</button>
            </div>
        );
};

Dictaphone.propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
};

export default SpeechRecognition(options)(Dictaphone);
