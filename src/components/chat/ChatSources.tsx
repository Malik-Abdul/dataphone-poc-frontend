import { Message } from "@/types/chat";
import { Chip, Stack } from "@mui/material";

interface ChatSourcesProps {
  sources?: Message["sources"];
}

export default function ChatSources({ sources }: ChatSourcesProps) {
  if (!sources?.length) {
    return null;
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      {sources.map((source, index) => (
        <Chip
          key={index}
          size="small"
          label={`Page ${source.page} • Chunk ${source.chunk}`}
        />
      ))}
    </Stack>
  );
}
