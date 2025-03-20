export const scrollToHeading = (id: string) => {
  const headingElement = document.getElementById(id);
  headingElement?.scrollIntoView();
};
