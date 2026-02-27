import { useEffect, useState } from "react";

// It generates a random color
const getRandomColor = () => {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
};

//It will define the text color based on the background color brightness
const getBrightness = (hexColor) => {
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);
  return (299 * r + 587 * g + 114 * b) / 1000;
};

//It will generate the placeholder URL using the first letter of the username + random color + text color
const generatePlaceholder = (username) => {
  const firstLetter = username?.toUpperCase();
  const bgColor = getRandomColor();
  const brightness = getBrightness(bgColor);
  const textColor = brightness < 125 ? "ffffff" : "000000";
  return `https://ui-avatars.com/api/?name=${firstLetter}&background=${bgColor}&color=${textColor}`;
};

export const useAvatar = (username) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (!username) return;

    const key = `avatar_${username}`;
    let bgColor = localStorage.getItem(key);

    if (!bgColor) {
      bgColor = getRandomColor();
      localStorage.setItem(key, bgColor);
    }

    setAvatarUrl(generatePlaceholder(username, bgColor));
  }, [username]);

  return avatarUrl;
};