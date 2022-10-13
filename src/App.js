import { useState, useEffect } from "react";
import "./styles.css";

const API_KEY = "63bff6cdbdcdd6d031b81acdff02685a593303ee";
const SERVER_URL = `https://emoji-api.com/emojis?access_key=${API_KEY}`;

export default function App() {
  const [emojiData, setEmojiData] = useState([]);
  const [emoji, setEmoji] = useState("");
  const [inputEmoji, setInputEmoji] = useState("");
  const [meaning, setMeaning] = useState("Translation will appear here");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        let newData = data.map((data) => {
          let properties = {
            character: data.character,
            meaning: data.unicodeName,
          };
          return properties;
        });
        setEmojiData(newData);
      });
  }

  function handleClickEmoji(emoji) {
    setEmoji(emoji.character);
    setMeaning(emoji.meaning);
  }

  function handleEmojiChange(event) {
    const inputEmoji = event.target.value;
    setInputEmoji(inputEmoji);

    const findEmoji = emojiData.find((e) => e.character === inputEmoji);
    if (findEmoji) {
      setEmoji(findEmoji.character);
      setMeaning(findEmoji.meaning);
    } else {
      setEmoji("");
      setMeaning("Emoji Not found");
    }
  }
  return (
    <div className="App">
      <h1>Emoji Dictionary</h1>
      <input
        onChange={handleEmojiChange}
        value={inputEmoji}
        placeholder={"Search your emoji"}
        style={{
          padding: "1em",
          minWidth: "70%",
        }}
      />
      <h2>{emoji}</h2>
      <h3>{meaning}</h3>
      <div className="emoji-container">
        {emojiData
          ?.filter((item, i) => i < 200)
          .map((emoji, i) => (
            <span
              className="emoji-content"
              onClick={() => handleClickEmoji(emoji)}
              key={i}
            >
              {emoji.character}
            </span>
          ))}
      </div>
    </div>
  );
}
