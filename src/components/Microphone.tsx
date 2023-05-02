import React, {useEffect} from 'react';
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

  useEffect(() => {
    if(disabled){
        SpeechRecognition.stopListening();
    }
  }, [disabled]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if(listening){
    transcription(transcript);
  }

  function handleClick(){
    if(!disabled){
        if(listening){
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
                listening ? (
                    <span className={styles.phoneOn}><HiMicrophone /></span>
                ) : (
                    <span><HiOutlineMicrophone /></span>
                )
            }
        </div>
    </div>
  );
};