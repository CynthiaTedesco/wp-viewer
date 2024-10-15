export function parseToCSV(inputText) {
  // Split the input by newlines
  const lines = inputText.split("\n");
  let csvData = [["date", "time", "actor", "message"]]; // CSV header
  let currentMessage = ""; // Accumulate message lines for multiline
  let currentLineData = null; // Store current parsed line (date, time, actor, message)

  // Helper function to add the current accumulated message to CSV
  const addParsedLine = () => {
    if (currentLineData) {
      currentLineData[3] = currentMessage.trim(); // Trim any extra spaces
      csvData.push(currentLineData); // Add to CSV
      currentMessage = ""; // Reset the message for next entry
      currentLineData = null; // Clear current line
    }
  };

  // Regex to match lines with date, time, and optional actor
  const lineRegex = /^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - (?:(.+?): )?(.*)$/;

  lines.forEach((line) => {
    const match = line.match(lineRegex);

    if (match) {
      // If we find a valid line, first add any accumulated message
      addParsedLine();

      // Extract parts from the matched regex
      const date = match[1];
      const time = match[2];
      const actor = match[3] || ""; // If there's no actor, leave it empty
      const message = match[4];

      // Set up the new line data (without message, which could be multiline)
      currentLineData = [date, time, actor, ""];
      currentMessage = message;
    } else {
      // If no match, it's a continuation of the previous message (multiline)
      currentMessage += "\n" + line;
    }
  });

  // Add the last message if any
  addParsedLine();

  // Convert CSV data to string format
  return csvData
    .map((row) => row.map((item) => `"${item}"`).join(","))
    .join("\n");
}
