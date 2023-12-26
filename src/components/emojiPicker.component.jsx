import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export function EmojiPicker({onEmojiSelect }) {
  return (
    <Picker
      data={data}
      onEmojiSelect={onEmojiSelect}
      dynamicWidth={false}
      emojiSize={20}
      emojiButtonSize={28}
      previewPosition={"none"}
     
    />
  );
}
