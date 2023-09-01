import axios from 'axios';
import { ConvaiClient } from 'convai-web-sdk';
import { useEffect, useRef, useState } from 'react';
export const useConvaiClient = ({ _apiKey, _characterId }) => {
  const [isProximity, setIsProximity] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [session, setSession] = useState('-1');
  const [keyPressed, setKeyPressed] = useState(false);
  const [userText, setUserText] = useState('');
  const [history, setHistory] = useState(1);
  const [characterID, setCharacterID] = useState(_characterId);
  const [npcText, setNpcText] = useState('');
  const [gender, setGender] = useState('MALE');
  const [actionText, setActionText] = useState('');
  const [currentCharId, setCurrentCharId] = useState('');
  const [enter, setEnter] = useState(0);
  const [messages, setMessages] = useState([]);
  const [npcName, setNpcName] = useState('Npc');
  const [userName, setUserName] = useState('User');
  const convaiClient = useRef(null);
  const finalizedUserText = useRef();
  const npcTextRef = useRef();
  useEffect(() => {
    if (isProximity) {
      convaiClient.current = new ConvaiClient({
        apiKey: _apiKey,
        characterId: _characterId,
        enableAudio: true,
      });
      setCurrentCharId(_characterId);
      convaiClient.current.setResponseCallback((response) => {
        if (response.hasUserQuery()) {
          let transcript = response.getUserQuery();
          let isFinal = transcript.getIsFinal();
          if (isFinal) {
            finalizedUserText.current += ' ' + transcript.getTextData();
            transcript = '';
          }
          if (transcript) {
            setUserText(finalizedUserText.current + transcript.getTextData());
          } else {
            setUserText(finalizedUserText.current);
          }
        }
        if (response.hasAudioResponse()) {
          let audioResponse = response?.getAudioResponse();
          npcTextRef.current += ' ' + audioResponse.getTextData();
          setNpcText(npcTextRef.current);
        }
        if (response.hasActionResponse()) {
          let actionResponse = response.getActionResponse();
          let parsedActions = actionResponse.getAction().trim().split('\n');
          setActionText(parsedActions[0].split(', '));
        }
      });

      const fetchData = async () => {
        // console.log("*******");
        try {
          const url = 'https://api.convai.com/character/get';
          const payload = {
            charID: _characterId,
          };
          const headers = {
            'CONVAI-API-KEY': _apiKey,
            'Content-Type': 'application/json',
          };

          const response = await axios.post(url, payload, { headers });
          if (npcName !== response.data.character_name) {
            setNpcName(response.data.character_name);
            setGender(response.data.voice_type);
          }
        } catch (error) {
          console.error('Error fetching character:', error);
        }
      };

      fetchData();

      convaiClient.current.onAudioPlay(() => {
        setIsTalking(true);
      });

      convaiClient.current.onAudioStop(() => {
        setIsTalking(false);
      });
    }
  }, [isProximity]);

  const userInput = (text) => {
    setUserText(text);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 84 && !keyPressed) {
      e.stopPropagation();
      e.preventDefault();
      setKeyPressed(true);
      finalizedUserText.current = '';
      npcTextRef.current = '';
      setUserText('');
      setNpcText('');
      convaiClient.current.startAudioChunk();
    }
  };
  const handleKeyRelease = (e) => {
    if (e.keyCode === 84 && keyPressed) {
      e.preventDefault();
      setKeyPressed(false);
      convaiClient.current.endAudioChunk();
    }
  };

  const sentText = () => {
    finalizedUserText.current = '';
    npcTextRef.current = '';
    setNpcText('');
    convaiClient.current.sendTextChunk(userText);
    setEnter(0);
  };

  useEffect(() => {
    if (isTalking && !isProximity) {
      convaiClient.current.endAudioChunk();
      console.log('stopped talking out of range');
    }
    if (isProximity) {
      console.log('The Guide is in range');
    } else {
      console.log('The Guide is out of range');
    }
  }, [isProximity]);
  const showHistory = () => {
    setHistory(!history);
  };

  const ResetHistory = () => {
    const storedData = localStorage.getItem('messages');
    // console.log("Here");
    if (storedData) {
      // Parse the retrieved data from JSON format
      const parsedData = JSON.parse(storedData);
      // Update the messages for the current character ID in the stored data
      // console.log(parsedData[characterID]);
      parsedData[characterID] = {
        sessionID: -1,
        message: [''],
      };
      // Update the stored data in localStorage
      localStorage.setItem('messages', JSON.stringify(parsedData));
    }
    if (convaiClient?.current) {
      convaiClient.current.resetSession();
      // console.log("Id:", convaiClient.current.sessionId);
    }
    setSession('-1');
    setMessages([]);
    setUserText('');
    setNpcText('');
  };

  const handleRedirect = () => {
    // navigate(-1);
  };

  useEffect(() => {
    // Retrieve stored data from localStorage
    const storedData = localStorage.getItem('messages');

    if (characterID) {
      if (storedData) {
        // Parse the retrieved data from JSON format
        const parsedData = JSON.parse(storedData);

        const characterIDs = Object.keys(parsedData);

        // Check if character ID matches the stored character ID
        if (characterIDs.includes(characterID)) {
          // Retrieve the sessionID for the current character ID
          const parsedSessionID = parsedData[characterID].sessionID;
          if (parsedSessionID) {
            // Update the sessionID state
            setSession(parsedSessionID);
            // console.log("Parsed Session Id", parsedSessionID);
            // console.log("Parsed", session);
          }

          // Retrieve the messages for the current character ID
          const parsedMessage = parsedData[characterID].message;
          if (parsedMessage) {
            const storedMessages = JSON.parse(parsedMessage);

            // Update the messages state
            setMessages(storedMessages);
          }
        } else {
          // No stored messages for the current character ID
          setMessages([]);
        }
      } else {
        // No stored data
        setSession('-1');
        setMessages([]);
      }
    }
  }, [characterID]);

  useEffect(() => {
    if (convaiClient) {
      if (convaiClient?.current?.sessionId !== '-1') {
        setSession(convaiClient?.current?.sessionId);
        // console.log("SessionId:", convaiClient.current.sessionId);
      }
      // console.log("Session:", session);
      if (characterID && messages) {
        // console.log("M", messages);
        const messagesJSON = JSON.stringify(messages);
        const storedData = localStorage.getItem('messages');

        if (storedData) {
          // Parse the retrieved data from JSON format
          const parsedData = JSON.parse(storedData);

          // Update the messages for the current character ID in the stored data
          parsedData[characterID] = {
            sessionID: session,
            message: messagesJSON,
          };
          // Update the stored data in localStorage
          localStorage.setItem('messages', JSON.stringify(parsedData));
        } else {
          // No stored data, create a new entry for the current character ID
          const messagesData = {
            [characterID]: {
              sessionID: session,
              message: messagesJSON,
            },
          };
          localStorage.setItem('messages', JSON.stringify(messagesData));
        }
      }
    }
  }, [characterID, messages, session]);

  // Stores User message
  useEffect(() => {
    const newMessage = {
      sender: 'user',
      content: userText,
    };
    if (userText !== '')
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [userText]);

  // Stores Npc's message
  useEffect(() => {
    const newMessage = {
      sender: 'npc',
      content: npcText,
    };
    if (npcText !== '')
      setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [npcText]);

  const client = {
    convaiClient,
    setUserText,
    setNpcText,
    isProximity,
    setIsProximity,
    isTalking,
    userText,
    npcName,
    userName,
    npcText,
    keyPressed,
    handleKeyPress,
    handleKeyRelease,
    userInput,
    setEnter,
    currentCharId,
    history,
    showHistory,
    ResetHistory,
    gender,
    isHovered,
    setIsHovered,
    messages,
  };
  return { client };
};
