import React from 'react';

// Mapping of HTML entities to their corresponding characters
const htmlEntities: { [key: string]: string } = {
  '&amp;': '&', // Ampersand
  '&lt;': '<', // Less-than sign
  '&gt;': '>', // Greater-than sign
  '&quot;': '"', // Double quotation mark
  '&#39;': "'", // Single quotation mark
  '&nbsp;': ' ', // Non-breaking space
};

/**
 * Replaces HTML entities in a string with their corresponding characters.
 * @param str The string containing HTML entities to be replaced.
 * @returns The string with HTML entities replaced by their corresponding characters.
 */
export const replaceHTMLEntities = (str: string): string => {
  return str.replace(/&[a-zA-Z0-9#]+;/g, (entity: string): string => {
    return htmlEntities[entity] || entity;
  });
};

// Define the props type for the SanitizedText component
interface SanitizedTextProps<T extends React.ElementType> {
  as?: T; // HTML element type
  value: string; // Text content
  className?: string; // CSS class name
  style?: React.CSSProperties; // Inline styles
  onClick?: React.MouseEventHandler<HTMLElement>; // Click event handler
  // Extend props to include all possible HTML element attributes
  [key: string]: any; // Additional props
}

// Default props to use a div if no tag is provided
const defaultElement = 'div';

// Create the SanitizedText component
const SanitizedText = <T extends React.ElementType = typeof defaultElement>({
  as,
  value,
  children,
  ...props
}: SanitizedTextProps<T>) => {
  // Determine the element type to render
  const Element = as || defaultElement;

  // Replace HTML entities in the text content
  const sanitizedValue = replaceHTMLEntities(value);

  // Render the component with the specified element type and props
  return (
    <Element {...props}>
      {sanitizedValue}
      {children}
    </Element>
  );
};

export default SanitizedText;
