//the date and time format: "dd/mm/yyyy, hh:mm -"
export const DATE_TIME_PATTERN: RegExp = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/;

export const NEW_LINE_SEPARATOR = '_NEW_LINE_';
export const DATE_TIME_SEPARATOR = '_DATE_TIME';

export const messages = {
  // Regex to match lines with date, time, an optional actor, and a message
  ALL: /^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - (?:(.+?): )?(.*)$/,
  NON_INFORMATIVE:
    /^(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}) - ([^:]+): (.*?)( <Media omitted>)?$/,
  // Regex to match lines with date, time, no actor and a message
  INFORMATIVE: /\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2} - [^:]+$/,
  // Regex to match lines with date, time, an actor and a message
  WITH_ACTOR: (name: string) =>
    new RegExp(`\\d{2}\\/\\d{2}\\/\\d{4}, \\d{2}:\\d{2} - ${name}: .*`),
  // Regex to match lines with date, time, an actor, and a media
  WITH_MEDIA: (name: string) =>
    new RegExp(
      `\\d{2}\\/\\d{2}\\/\\d{4}, \\d{2}:\\d{2} - ${name}: <Media omitted>`
    ),
};
