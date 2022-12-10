export const externalLink = {
  name: 'externalLink',
  title: 'URL',
  type: 'url',
  validation: (Rule) =>
    Rule.uri({
      scheme: ['https', 'http', 'mailto', 'tel'],
    }).error(
      'Ugyldig URL. URLen må starte med "https://", "http://", "mailto:" eller "tel:".'
    ),
}
