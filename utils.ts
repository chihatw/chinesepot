const LOCAL_PART_SEGMENT_PATTERN = /^[a-zA-Z0-9_+-]+$/;
const DOMAIN_LABEL_PATTERN = /^[a-zA-Z0-9-]+$/;
const TOP_LEVEL_DOMAIN_PATTERN = /^[a-zA-Z]{2,}$/;

export const isValidEmail = (input: string) => {
  const atIndex = input.indexOf('@');
  if (atIndex <= 0 || atIndex !== input.lastIndexOf('@')) return false;

  const localPart = input.slice(0, atIndex);
  const domain = input.slice(atIndex + 1);
  const localPartSegments = localPart.split('.');
  const domainLabels = domain.split('.');

  if (
    !localPartSegments.every((segment) =>
      LOCAL_PART_SEGMENT_PATTERN.test(segment),
    ) ||
    domainLabels.length < 2
  ) {
    return false;
  }

  const topLevelDomain = domainLabels.at(-1);
  if (!topLevelDomain || !TOP_LEVEL_DOMAIN_PATTERN.test(topLevelDomain)) {
    return false;
  }

  return domainLabels.slice(0, -1).every(
    (label) =>
      DOMAIN_LABEL_PATTERN.test(label) &&
      !label.startsWith('-') &&
      !label.endsWith('-'),
  );
};
