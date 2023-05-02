import React, {useEffect, useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from "../styles/Microphone.module.css";
import {HiMicrophone, HiOutlineMicrophone} from "react-icons/hi";

interface MicrophoneProps{
    transcription: (text: string) => void;
    disabled: boolean;
}

export default function Microphone({transcription, disabled}: MicrophoneProps){
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  useEffect(() => {
    if(disabled){
        SpeechRecognition.stopListening();
    }
  }, [disabled]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if(isListening){
    transcription(transcript);
  }

  function handleClick(){
    if(!disabled){
        if(isListening){
            SpeechRecognition.stopListening();
        } else{
            resetTranscript();
            startListening();
        }
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.microphone} onClick={handleClick}>
            {
                isListening ? (
                    <div className={styles.phoneOn}><HiMicrophone /></div>
                ) : (
                    <div><HiOutlineMicrophone /></div>
                )
            }
        </div>
    </div>
  );
};